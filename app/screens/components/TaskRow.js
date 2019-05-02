import React from "react";

import {
  Text,
  View,
  TouchableHighlight,
  Platform
} from "react-native";

import Icon from "../../components/TabBarIcon";
import styles from "../style";

export default TaskRow = (props) => {
  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskTextContainer}>
        <Text style={styles.taskDate}>
          {props.task.date}
        </Text>
        <Text style={styles.taskTitle}>
          Task Name: {props.task.title}
        </Text>
        <Text style={styles.taskTime}>
          Time: {props.task.hours}
        </Text>
        <Text style={styles.taskAddress}>
          {
            "Location: \n" + 
            props.task.location.streetAddress + '\n' +
            props.task.location.city + ", " + props.task.location.state + " " + props.task.location.zipcode
            /* {
            props.task.address === "\n\t\t\t,  " ?
                <Text>Location: No Location Given</Text> :
                <Text>Location: {props.task.address}</Text>
            } */
          }
        </Text>
      </View>
      <View style={styles.taskButtonContainer}>
        <TouchableHighlight
          style={props.deleteMode ? {
            flex: 1,
            alignItems: "center"
          } : { display: "none" }
          }
          onPress={() => { props.press(props.task) }}
        >
          <Icon
            name={
              Platform.OS === "ios"
                ? "ios-close-circle-outline"
                : "md-close-circle-outline"
            }
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}