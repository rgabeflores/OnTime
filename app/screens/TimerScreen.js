import React from "react";
import { Text, SafeAreaView } from "react-native";

export default class TimerScreen extends React.Component {
  static navigationOptions = {
    title: "Timer"
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <SafeAreaView>
        <Text>Something</Text>
      </SafeAreaView>
    );
  }
}
