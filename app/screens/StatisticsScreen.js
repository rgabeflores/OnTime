import React from 'react';
import {
  Text,
  View
} from 'react-native';


import { connect } from "react-redux";
import styles from './style';

import { db } from "../config/db";
import {
  StackedBarChart
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
      colors: [],
      data: [],
      keys: [],
      finishedFetch: false
    };
  }
  componentDidMount() {
    this.getItems();
  }
  // get the items from the list view
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
          keys: [...prevState.keys, dbData[i].title]
        }))
      }
      console.log(dbData)
      console.log("keys: " + this.state.keys)
      console.log("Data: " + this.state.data);
      console.log("Colors: " + this.state.colors);
      this.setState({
        tasks: dbData,
      });
      this.setState({ finishedFetch: true })
    });
  };
  render() {
    return (
      <View>
        <Text>{"Statistics for " + this.props.user.account.accountInfo.name}</Text>
        <View style={
          this.state.finishedFetch ?
            { display: "flex" }
            : { display: "none" }}>
          {/* <StackedBarChart
            style={{ height: '100%' }}
            keys={this.state.keys}
            colors={this.state.colors}
            data={this.state.tasks}
            showGrid={false}
            contentInset={{ top: 30, bottom: 30 }}
          /> */}
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