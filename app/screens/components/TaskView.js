import React from "react";
import {
    Text,
    View,
    TouchableHighlight
} from "react-native";

import styles from "../style";

export default TaskView = (props) => {
    // Parse time NOTE: format time when saved to database?
    let time = props.item.time.split(":");
    let hours = Number(time[0]);
    let minutes = Number(time[1]);
    let AMorPM = "AM";

    if(hours >= 12 && hours <= 23){
        if(hours > 12) hours -= 12;
        AMorPM = "PM";
    }
    if(minutes === 0) minutes = "00";

    return (
        <View style={styles.calendarTaskContainer}>
            <View>
                <Text style={styles.calendarTaskTitle}>{props.item.name}</Text>
                <Text style={styles.calendarTaskDescription}>{hours + ":" + minutes + AMorPM}</Text>
                <Text>{props.item.location.streetAddress}</Text>
                <Text>{props.item.location.city}, {props.item.location.state} {props.item.location.zipcode}</Text>
            </View>
            <TouchableHighlight
                style={styles.calendarTaskButtonContainer}
                onPress={() => { props.action(props.item) }}
                underlayColor="white"
            >
                <View style={styles.calendarTaskButton}>
                    <Text style={styles.calendarTaskButtonText}>Edit</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}