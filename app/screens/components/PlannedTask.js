import React from 'react';
import {
    Text,
    View,
    Button,
    TouchableHighlight,
    Modal
} from 'react-native';
import {
    PieChart
} from "react-native-svg-charts";
import { connect } from "react-redux";

import styles from '../style';

export class PlannedTask extends React.Component {
    constructor() {
        super();
        this.state = {
            dates: [],
            timeData: []
        };
    }
    componentDidMount() {
        var keyDates = Object.keys(this.props.user.account.taskDates)
        var dates = []
        var tasksInADay = []
        var time = [[]]
        keyDates.forEach(date => {
            // the date e.g. '2019-04-20' is pushed into one array 
            dates.push(date)
            // the array of tasks on a given date is stored on a new array
            tasksInADay.push(this.props.user.account.taskDates[date])
        });
        var y = 0
        tasksInADay.forEach(day => {
            // for each task in the day, store it in an array
            var i = 0
            var len = day.length
            // add the time on each index of the array
            day.forEach(task => {
                time[y][i] = task.time.replace(/\D/g, '')
                i++
            })
            // if the day is not the last one then make the 2d array bigger
            if (day != tasksInADay[tasksInADay.length - 1]) {
                y++
                time[y] = []
            }
        })
        this.setState({
            dates: dates,
            timeData: time
        })
    }

    // generates a random color hexcode
    randomColor() {
        /*
            Uncomment for random shades of blue

            h = 215;
            s = Math.floor(Math.random() * 100);
            l = 60 // Math.floor(Math.random() * 100);
            return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
        */
        return ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);
    }

    render() {
        let pieCharts = this.state.dates.map((val, index) => {
            var keyValue = `pie-${index}`;
            var pieData = this.state.timeData[index]
                .filter(value => value > 0)
                .map((value, index) => ({
                    value,
                    svg: {
                        fill: this.randomColor()
                    },
                    key: keyValue + index
                }))
            
            return (
                <View style={styles.pieChartContainer} key={keyValue}>
                    <Text style={styles.pieChartTitle}>
                        Planned Tasks for {this.state.dates[index]}
                    </Text>
                    <PieChart
                        style={styles.pieChart}
                        data={pieData}
                    />
                </View>
            )
        });

        return (
            <View style={{...styles.container, marginTop: 5}}>
                { pieCharts }
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