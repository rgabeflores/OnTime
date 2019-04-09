import React from "react";
import {
    Text,
    View,
} from "react-native";

import styles from "../style";

export default DayView = (props) => {
    return (
        <View styles={{ marginTop: 100 }}>
            <Text styles={{ color: "lightblue" }}>{props.item.text}</Text>
        </View>
    );
}