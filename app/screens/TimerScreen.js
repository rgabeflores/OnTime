import React from "react";
import { Text, TextInput, SafeAreaView, View } from "react-native";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import { TouchableHighlight } from "react-native";

import { connect } from "react-redux";

export class TimerScreen extends React.Component {
  static navigationOptions = {
    title: "Timer"
  };
  constructor(props) {
    //initialize variables
    super(props);
    this.state = {
      timerStart: false,
      stopwatchStart: false,
      totalDuration: 10000,
      timerReset: false,
      stopwatchReset: false
    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  //Toggles timer between start and stop functions
  toggleTimer() {
    this.setState({ timerStart: !this.state.timerStart, timerReset: false });
  }

  //Resets timer to set value
  resetTimer() {
    this.setState({ timerStart: false, timerReset: true });
  }

  //Toggles stopwatch between start and stop fuctions
  toggleStopwatch() {
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false
    });
  }

  //Resets stopwatch back to zero
  resetStopwatch() {
    this.setState({ stopwatchStart: false, stopwatchReset: true });
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }

  render() {
    return (
      <SafeAreaView>
        <Text style={{ fontSize: 30 }}>Stopwatch</Text>

        {/*Component which shows current value of stopwatch */}
        <Stopwatch
          laps
          msecs
          start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this.getFormattedTime}
        />

        {/*Button that toggles between Start and Stop*/}
        <TouchableHighlight onPress={this.toggleStopwatch} underlayColor='lightblue'>
          <Text style={{fontSize: 30,left:120,}}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
        </TouchableHighlight>

        {/*Button that resets stopwatch back down to zero*/}
        <TouchableHighlight onPress={this.resetStopwatch} underlayColor='lightblue'>
          <Text style={{fontSize: 30,left:120,}}>Reset</Text>
        </TouchableHighlight>

        <Text style={{ fontSize: 30 }}>Timer</Text>

        {/*Component which shows current value of timer*/}
        <Timer
          totalDuration={this.state.totalDuration}
          msecs
          start={this.state.timerStart}
          reset={this.state.timerReset}
          options={options}
          getTime={this.getFormattedTime}
        />

        {/*Button that toggles between Start and Stop*/}
        <TouchableHighlight onPress={this.toggleTimer} underlayColor='lightblue'>
          <Text style={{fontSize: 30,left:120,}}>{!this.state.timerStart ? "Start" : "Stop"}</Text>
        </TouchableHighlight>

        {/*Button that resets timer back up to set value*/}
        <TouchableHighlight onPress={this.resetTimer} underlayColor='lightblue'>
          <Text style={{fontSize: 30,left:120,}}>Reset</Text>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }
}
//style for timer screen
const options = {
  container: {
    backgroundColor: "lightblue",
    padding: 5,
    borderRadius: 5,
    width: 220,
    position: "relative",
    left: 50
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    textAlign: "center",
  },
}
// create map of "store" object passed from Provider to this component's props
const mapStateToProps = store => {
  return {
    user: store.user.user // store.user == reducer, store.user.user == reducer.state.user
  };
};

// create map of "dispatch" object passed from Provider to this component's props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch
//   }
// }

// connect() applies maps to component's props
export default connect(mapStateToProps)(TimerScreen);
