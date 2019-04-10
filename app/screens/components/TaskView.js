import React from "react";
import {
    Text,
    View,
    FlatList
} from "react-native";
import { List, ListItem } from "react-native-elements";

import styles from "../style";

export default TaskView = (props) => {
    console.log(props);
    return (
        <View style={styles.taskContainer}>
            <Text>{props.item.title}</Text>
            <Text>{props.item.text}</Text>
        </View>
    );
}