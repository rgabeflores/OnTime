import React from 'react';
import {
  Text,
  View
} from 'react-native';


import { connect } from "react-redux";
import styles from './style';

import { db } from "../config/db";
import {
  StackedBarChart,
  XAxis,
  Grid
} from 'react-native-svg-charts'
export class StatisticsScreen extends React.Component {

  static navigationOptions = {
    title: 'Statistics',
  };

  // generates a random color hexcode
  randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);
  constructor() {
    super();
    this.state = {
      tasks: [],
      titles: [],
      colors: [],
      data: [],
      // keys is what the label is in the task
      keys: ['hours'],
      finishedFetch: false
    };
  }
  // fetch the data from the database
  componentDidMount() {
    this.getItems();
  }

  // fetching the data from the database
  getItems = async () => {
    var userRef = db.ref("Accounts/" + this.props.user.uid + "/tasks/");
    let dbData = [];
    userRef.once("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        var taskName = childSnapshot.key; // "task name"
        var taskDetails = childSnapshot.val();
        // console.log(taskName);
        // console.log(taskDetails);
        var temp = {
          title: taskName,
          hours: taskDetails.hours,
          address: taskDetails.address
        };
        dbData.push(temp);
        return false;
      });
      for (i = 0; i < dbData.length; i++) {
        this.setState(prevState => ({
          data: [...prevState.data, dbData[i].hours],
          colors: [...prevState.colors, ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)],
          titles: [...prevState.titles, dbData[i].title]
          //keys: [...prevState.keys, dbData[i].title]
        }))
      }
      this.setState({
        tasks: dbData,
      });
      this.setState({ finishedFetch: true })
    });
  };
  render() {
    return (
      <View>
        <Text>{"Planned Tasks for " + this.props.user.account.accountInfo.name}</Text>
        <View style={
          this.state.finishedFetch ?
            { display: "flex", height: 200, padding: 20 }
            : { display: "none" }}>
          <StackedBarChart
            style={{ height: '80%' }}
            keys={this.state.keys}
            colors={this.state.colors}
            data={this.state.tasks}
            showGrid={false}
            contentInset={{ top: 30, bottom: 30 }}
          >
            <Grid />
          </StackedBarChart>
          <XAxis
            style={{ marginHorizontal: -20 }}
            data={this.state.titles}
            formatLabel={(value) => value + 1}
            contentInset={{ left: 50, right: 50 }}
          />
          <Text>Legend</Text>
          {this.state.titles.map((title,idx) => (
            <Text key={title}>{idx+1}) {title}</Text>
          ))}
        </View>
      </View>
    );
  }
}

// create map of "store" object passed from Provider to this component's props
const mapStateToProps = (store) => {
  return {
    user: store.user.user, // store.user == reducer, store.user.user == reducer.state.user
  }
};

// create map of "dispatch" object passed from Provider to this component's props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch
//   }
// }

// connect() applies maps to component's props
export default connect(mapStateToProps)(StatisticsScreen);