import React from 'react';
import {
    Text,
    View,
    Button,
    TouchableHighlight,
    Modal
} from 'react-native';
import {
    StackedBarChart
} from "react-native-svg-charts";

import { connect } from "react-redux";
export class PlannedTask extends React.Component {

    constructor() {
        super();
        this.state = {
            
        };
    }
    componentDidMount() {
        var keyDates = Object.keys(this.props.user.account.taskDates)
        var tasks = []
        var time = []
        var i = 0
        keyDates.forEach(date => {
            console.log(date)
            // this pushes the tasks on each date to the task array
            // consider storing it to a 2-d array where 
            // first dimension is the date
            // second dimension is the tasks?
            // or consider other
            tasks.push(this.props.user.account.taskDates[date])
            i++
        });
        console.log(tasks)
    }
    render() {
        return (
            <View>
            </View>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user.user,
    }
};
export default connect(mapStateToProps)(PlannedTask);