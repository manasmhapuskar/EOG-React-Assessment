// Successfully able to implement dropdown list


import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import MetricsGraph from './MetricsGraph';
import Axios from 'axios';


const metricURL = 'https://react.eogresources.com/graphql';

class DropdownList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedOptions: [] };
    }

    onClickDropdownHandle = (selectedMetrics) => {
        let metricList = [];
        let msPerMinute = 60000;
        let time = Date.now() - 30 * msPerMinute;

        selectedMetrics.map(option => {
            let metric = '{metricName'+':"'+option+'", after:'+time+'}'; 
            metricList.push(metric);
        });

        let getMultipleMeasurements = (input) => `{
            getMultipleMeasurements(input:[${input}]) {
                measurements {
                    metric at value
                }
            }
        }`;

        Axios.post(metricURL,{query: getMultipleMeasurements(metricList)}).then(result => {
            this.setState({ selectedOptions: result.data.data != null && result.data.data != undefined ? result.data.data : []});
        });
    }


    // Implementing Dropdown Functionality

    render() {
        return (
            <div>
                <div className = "dropdown">
                    <Typeahead
                        defaultSelected = {this.props.metrics.slice(0, 2)}
                        options = {this.props.metrics}
                        onChange = {this.onClickDropdownHandle}
                        id = "selections"
                        labelKey = "name"
                        placeholder = "Select from the options below"
                        clearButton
                        multiple
                    />
                </div>
                <div className = "graph">
                    <MetricsGraph measurements = {this.state.selectedOptions.getMultipleMeasurements} />
                </div>
            </div>
        );
    }
}

export default DropdownList;