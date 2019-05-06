import React from "react";
import {
    Text,
    View,
} from "react-native";

import styles from "../style";

export default EmptyDateView = (props) => {
    return (
        <View style={styles.calendarEmptyTaskContainer}>
            <View style={styles.calendarEmptyTask}></View>
        </View>
    );
}