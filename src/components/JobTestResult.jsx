
import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';

class JobTestResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
           result : null 
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
        const fullDisplayName = result["fullDisplayName"];
        testResultNode = (
            <div>
                Test
            </div>
        );
        return(
            <div>
                <div className="widget__header">
                    { fullDisplayName }
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
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
