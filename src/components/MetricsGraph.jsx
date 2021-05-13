// Unsuccessful to implement MetricsGraph due to errors in filter data from Metrics Data Set.


import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries } from 'react-vis';


// Graph Component

class MetricsGraph extends React.Component {
    constructor(props) {
        super(props);
    }

    createGraphData = (index) => {

        if(this.props.measurement != undefined && this.props.measurement.length != 0) {
            return Object.entries(this.props.measurement[index].measurements).map((val) => {
                let today = new Date();
                today.setMinutes(today.getMinutes() - 30);

                if(val[1].value != null && val[1].value != undefined) {
                    if(new Date(val[1].at) >= today) {
                        return {
                            x: new Date(val[1].at),
                            y: Math.trunc(val[1].value),
                        };
                    }
                }
            });
        }
    }

    //Plotting X and Y Axis using Metrics Data

    render() {

        let metricDataSet = [];
        let metricList = [];
    
        if(this.props.measurement != null && this.props.measurement != undefined && this.props.measurement.length != 0) {
            for(var index in this.props.measurement) {
                metricDataSet = this.createGraphData(index);
                metricList.push(metricDataSet);
            }
    
            return (
                <div>
                    <div style = {{ display: 'flex' }}>
                        <XYPlot yPadding = {10} width = {1500} height = {1000}>
                            <HorizontalGridLines />
                            <VerticalGridLines />
                            <XAxis title = "X Axis" tickFormat = {function tickFormat(d) {
                                const date = new Date(d);
                                return date.toLocaleTimeString();
                            }} />
                            <YAxis title = "YAxis" />
                            {
                                metricList.map((dataset, index) => {
                                    return <LineSeries data = {dataset} key = {index} />
                                })
                            }
                        </XYPlot>
                    </div>
                </div>
            );
        } else {
            return(
                <div>
                    Select Metric from Dropdown
                </div>
            );
        }
    }
}

export default MetricsGraph;