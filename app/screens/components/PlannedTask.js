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
        var dates = this.props.user.account.taskDates
        console.log(dates)
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