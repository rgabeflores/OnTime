import React from "react";

import {
  Text,
  View,
  TouchableHighlight,
  Platform
} from "react-native";

import Icon from "../../components/TabBarIcon";
import styles from "../../components/style";
import otherStyles from "../style";

export default TaskRow = (props) => {
  return (
    <View>
      <View style={otherStyles.taskContainer}>
        <Text style={styles.liText}>
          Date: {props.task.date} {"\n"}
          Task Name: {props.task.title} {"\n"}
          Time: {props.task.hours} {"\n"}
          {
            props.task.address === "\n\t\t\t,  " ?
              <Text>Location: No Location Given</Text> :
              <Text>Location: {props.task.address}</Text>
          }
        </Text>
        <TouchableHighlight
          style={props.deleteMode ? {
            display: "flex",
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