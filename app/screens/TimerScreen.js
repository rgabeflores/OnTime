import React from "react";
import { Text, TextInput, SafeAreaView, View } from "react-native";
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { TouchableHighlight } from 'react-native';

import { connect } from "react-redux";

export class TimerScreen extends React.Component {
  static navigationOptions = {
    title: "Timer"
  };
  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      stopwatchStart: false,
      totalDuration: 10000,
      timerReset: false,
      stopwatchReset: false,
    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  toggleTimer() {
    this.setState({timerStart: !this.state.timerStart, timerReset: false});
  }

  resetTimer() {
    this.setState({timerStart: false, timerReset: true});
  }

  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  }

  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }

  getFormattedTime(time) {
    this.currentTime = time;
  };


  render() {
    return (
      <SafeAreaView>

        <Text style={{fontSize: 30}}>Stopwatch</Text>

        <Stopwatch laps msecs start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this.getFormattedTime} />

        <TouchableHighlight onPress={this.toggleStopwatch}>
          <Text style={{fontSize: 30,left:120,}}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.resetStopwatch}>
          <Text style={{fontSize: 30,left:120,}}>Reset</Text>
        </TouchableHighlight>

        <Text style={{fontSize: 30}}>Timer</Text>

        <Timer totalDuration={this.state.totalDuration} msecs start={this.state.timerStart}
          reset={this.state.timerReset}
          options={options}
          getTime={this.getFormattedTime} />

        <TouchableHighlight onPress={this.toggleTimer}>
          <Text style={{fontSize: 30,left:120,}}>{!this.state.timerStart ? "Start" : "Stop"}</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.resetTimer}>
          <Text style={{fontSize: 30,left:120,}}>Reset</Text>
        </TouchableHighlight>

      </SafeAreaView>

    );
  }
}

  const options = {
  container: {
    backgroundColor: 'lightblue',
    padding: 5,
    borderRadius: 5,
    width: 220,
    position:"relative",
    left:50,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    textAlign: "center",
  },

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
export default connect(mapStateToProps)(TimerScreen);
