import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Modal
} from 'react-native';


import { connect } from "react-redux";
import otherStyles from "./style";
import { db } from "../config/db";
import {
  PieChart
} from 'react-native-svg-charts'
import PlannedTask from '../screens/components/PlannedTask';
export class StatisticsScreen extends React.Component {

  static navigationOptions = {
    title: 'Statistics',
  };

  // generates a random color hexcode
  randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);
  constructor() {
    super();
    this.state = {    };
  }
  render() {
    return (
      <ScrollView>
        <PlannedTask/>
      </ScrollView>
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