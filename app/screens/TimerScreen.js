import React from "react";
import { Text, TextInput, SafeAreaView, View } from "react-native";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import { TouchableHighlight } from "react-native";

import { connect } from "react-redux";

import styles from './style'

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
    this.setState(prevState => ({
        ...prevState,
        timerStart: !this.state.timerStart,
        timerReset: false 
      }));
  }

  //Resets timer to set value
  resetTimer() {
    this.setState(prevState => ({
        ...prevState,
        timerStart: false,
        timerReset: true 
      }));
  }

  //Toggles stopwatch between start and stop fuctions
  toggleStopwatch() {
    this.setState(prevState => ({
      ...prevState,
      stopwatchStart: !this.state.stopwatchStart,
      // stopwatchReset: false
    }));
  }

  //Resets stopwatch back to zero
  resetStopwatch() {
    this.setState(prevState => ({ 
      ...prevState,
      stopwatchStart: false,
      stopwatchReset: true 
    }));
  }

  getFormattedTime(time) {
    this.currentTime = time;
    return time;
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.smallTitle}>Stopwatch</Text>
            <SafeAreaView>
              {/*Component which shows current value of stopwatch */}
              <Stopwatch
                laps
                msecs
                start={this.state.stopwatchStart}
                reset={this.state.stopwatchReset}
                options={options}
                getTime={this.getFormattedTime}
              />
            </SafeAreaView>

            {/*Button that toggles between Start and Stop*/}
            <TouchableHighlight style={styles.buttonContainer} onPress={this.toggleStopwatch} underlayColor='lightblue'>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
              </View>
            </TouchableHighlight>
            {/*Button that resets stopwatch back down to zero*/}
            <TouchableHighlight style={styles.buttonContainer} onPress={this.resetStopwatch} underlayColor='lightblue'>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Reset</Text>
              </View>
            </TouchableHighlight>
          </View>

          
          <View style={styles.container}>
            <Text style={styles.smallTitle}>Timer</Text>
            <SafeAreaView>
              {/*Component which shows current value of timer*/}
              <Timer
                totalDuration={this.state.totalDuration}
                msecs
                start={this.state.timerStart}
                reset={this.state.timerReset}
                options={options}
                getTime={this.getFormattedTime}
              />
            </SafeAreaView>

            {/*Button that toggles between Start and Stop*/}
            <TouchableHighlight style={styles.buttonContainer} onPress={this.toggleTimer} underlayColor='lightblue'>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{!this.state.timerStart ? "Start" : "Stop"}</Text>
              </View>
            </TouchableHighlight>

            {/*Button that resets timer back up to set value*/}
            <TouchableHighlight style={styles.buttonContainer} onPress={this.resetTimer} underlayColor='lightblue'>
              <View style={styles.button}> 
                <Text style={styles.buttonText}>Reset</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
    );
  }
}
//style for timer screen
const options = {
  container: styles.stopwatchContainer,
  text: styles.stopwatchText
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
