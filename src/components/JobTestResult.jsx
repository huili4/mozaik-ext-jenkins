
import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
const { Pie } = Mozaik.Component;

class JobTestResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
           result : {}
        };
    }

    getApiRequest() {
        const { job } = this.props;

        return {
            id:     `jenkins.jobTestResult`,
            params: { job }
        };
    }

    onApiData(result) {
        this.setState({ result });
    }

    render() {
        const { result } = this.state;
        const { job } = this.props;
        let fullDisplayName = '';
        let testResultDateStr = '';
        let testResultNode = (
            <div className="jenkins__job-test-result__loading">
                Loading...
            </div>
        );

        if (result && result.actions) {
            let testResultDate = new Date(result.timestamp);
            testResultDateStr = testResultDate.toLocaleString(
                'en-GB', { timeZone: 'Asia/Shanghai' });
            fullDisplayName = result.fullDisplayName;
            if (result.result == 'ABORTED') {
                testResultNode = (
                    <div className="jenkins__job-test-result__aborted">
                        ABORTED
                    </div>
                );
            } else {
                const actions = result.actions;
                let testResult = [
                    {id: 'fail', label: 'fail', color: '#B80000', count: 0}, 
                    {id: 'skip', label: 'skip', color: '#FCCB00', count: 0},
                    {id: 'success', label: 'success', color: '#2A8B2B', count: 0}
                ];
                let totalCount = 0;
                for (const action of actions) {
                    if(action._class == 'hudson.tasks.junit.TestResultAction') {
                        testResult[0]['count'] = action.failCount;
                        testResult[1]['count'] = action.skipCount;
                        testResult[2]['count'] = action.totalCount - action.failCount - action.skipCount;
                        totalCount = action.totalCount;
                        break;
                    }
                }

                testResultNode = (
                    <Pie data={testResult} count={totalCount} countLabel={'tests'} innerRadius={0.7}/>
                );
            }
        }
        return(
            <div>
                <div className="widget__header">
                    Jenkins { job } Last Completed Build Result
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    <div className="jenkins__job-test-result__title">
                        <span className="jenkins__job-test-result__title__desc">
                            Last Completed Test:
                        </span>
                        <span className="jenkins__job-test-result__title__name">
                            { fullDisplayName }
                        </span>
                    </div>
                    <div className="jenkins__job-test-result__time">
                        { testResultDateStr }
                    </div>
                    {testResultNode}
                </div>
            </div>
        );
    }
}

JobTestResult.displayName = 'JobTestResult';

JobTestResult.propTypes = {
    job:    PropTypes.string.isRequired,
};

reactMixin(JobTestResult.prototype, ListenerMixin);
reactMixin(JobTestResult.prototype, Mozaik.Mixin.ApiConsumer);


export default JobTestResult;
