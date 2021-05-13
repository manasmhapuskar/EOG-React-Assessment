import React from 'react';
import Axios from 'axios';
import DropdownList from './DropdownList';

const graphurl = 'https://react.eogresources.com/graphql'; 


class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            metricsList: []
        }
    }

    componentDidMount() {
        let getMetrics = '{getMetrics}';

        Axios.post(graphurl,{query: getMetrics}).then(response => {
            this.setState({ 
                metricsList: response.data.data.getMetrics
            });
        });
    }

    render() {
        return (
            <div variant = "dashboard">
                <DropdownList title = "Select from the dropdown" metrics = {this.state.metricsList}/>
            </div>
        );
    }
}

export default Dashboard;