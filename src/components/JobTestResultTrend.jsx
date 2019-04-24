import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';

class JobTestResultTrend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    getApiRequest() {
        const { job } = this.props;

        // TODO: Call the actual API for data
        return {
            id:     `jenkins.job.${job}`,
            params: { job }
        };
    }

    onApiData(data) {
        this.setState({ data });
    }

    render() {
        const { title, job } = this.props;
        const { data } = this.state;

        const finalTitle = title || `Jenkins job ${ job }`;

        var LineChart = require("react-chartjs").Line;

        // TODO: This is a fake dataset. Data should be retrieved from 
        // database instead
        var chartData = {
            labels: ["168", "169", "170", "171"],
            datasets: [
                {
                    label: "Success",
                    strokeColor: "#4ec2b4",
                    pointColor: "#4ec2b4",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighLightStroke: "#4ec2b4",
                    data: [300, 301, 299, 280]
                },
                {
                    label: "Fail",
                    strokeColor: "#de5029",
                    pointColor: "#de5029",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighLightStroke: "#de5029",
                    data: [18, 19, 17, 15]
                },
                {
                    label: "Skip",
                    strokeColor: "#d1be65",
                    pointColor: "#d1be65",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighLightStroke: "#d1be65",
                    data: [12, 19, 30, 15]
                }
            ]
        };

        let chartOptions = {
            scaleShowGridLines: true
        };

        // TODO: the size of chart should be scalable
        const chartWidth = "600";
        const chartHeight = "250";

        var myChart = (
            <LineChart data={ chartData } options={chartOptions} width={ chartWidth  } height={ chartHeight }/>
        );

        return (
            <div>
                <div className="widget__header">
                    {finalTitle}
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    <div className="jenkins__job-test-result-trend">
                        { myChart }
                    </div>
                </div>
            </div>
        );
    }
}


JobTestResultTrend.displayName = 'JobTestResultTrend';

JobTestResultTrend.propTypes = {
    job:    PropTypes.string.isRequired,
    title:  PropTypes.string
};

reactMixin(JobTestResultTrend.prototype, ListenerMixin);
reactMixin(JobTestResultTrend.prototype, Mozaik.Mixin.ApiConsumer);


export default JobTestResultTrend;
