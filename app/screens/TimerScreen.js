import React from "react";
import { Text, SafeAreaView, View } from "react-native";
import { db } from "../config/db";

export default class TimerScreen extends React.Component {
  static navigationOptions = {
    title: "Timer"
  };
  state = {
    tasks: []
  };

  componentDidMount() {
    db.ref("Test/").on("value", snapshot => {
      let data = snapshot.val();
      let tasks = Object.values(data);
      this.setState({ tasks });
    });
  }
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        {this.state.tasks.length > 0 ? (
          <View>
            {this.state.tasks.map((item, index) => {
              return (
                <View key={index}>
                  <Text>{item.name}</Text>
                  <Text>{item.pass}></Text>
                </View>
              );
            })}
          </View>
        ) : (
          <Text>No Items</Text>
        )}
      </View>
    );
  }
}
