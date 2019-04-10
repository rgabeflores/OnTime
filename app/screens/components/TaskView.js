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
        <View style={styles.calendarTaskContainer}>
            <View>
                <Text style={styles.calendarTaskTitle}>{props.item.name}</Text>
                <Text style={styles.calendarTaskDescription}>{props.item.description}</Text>
            </View>
            <View>
                <Text>{props.item.location.streetAddress}</Text>
                <Text>{props.item.location.city}, {props.item.location.state} {props.item.location.zipcode}</Text>
            </View>
        </View>
    );
}