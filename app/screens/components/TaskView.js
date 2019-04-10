import React from "react";
import {
    Text,
    View,
} from "react-native";

import styles from "../style";

export default TaskView = (props) => {
    console.log(props);
    // TO-DO: Add modal for additional information?
    return (
        <View style={styles.taskCalendarContainer}>
            <Text>{props.item.name}</Text>
            <Text>{props.item.description}</Text>
        </View>
    );
}