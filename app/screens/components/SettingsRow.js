import React from "react";
import {
    Text,
    View,
    Switch,
    TouchableHighlight
} from "react-native";

import styles from "../style";

export default SettingsRow = (props) => {
    let actionElement = props.isSwitch ? 
        (
            <Switch 
                trackColor={{false: "lightgrey", true: "#00adf5"}}
                onValueChange={(value) => {props.action(value)}}
                value={props.value}
            />
        )
            : 
        (
            <TouchableHighlight
                onPress={(value) => {props.action(value)}}
                underlayColor="white"
                style={styles.container}
            >
                <View style={styles.container}>
                    <Text style={{fontSize: 24}}>></Text>
                </View>
            </TouchableHighlight>
        );
    return (
        <View style={{...styles.container, ...styles.settingsRow}}>
            <View style={styles.settingsRowLabel}>
            <Text style={styles.settingsRowLabelText}>{props.title}</Text>
            </View>
            <View style={styles.settingsRowAction}>
                { actionElement }
            </View>
        </View>
    )
}