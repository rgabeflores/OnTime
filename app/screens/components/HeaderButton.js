import React from "react";
import {
    Text,
    View,
    TouchableHighlight
} from "react-native";

import styles from "../style";

export default HeaderButton = (props) => {
    return (
        <TouchableHighlight
            onPress={() => props.onPress()}
            underlayColor="white"
        >
            <View style={{alignItems: "center"}}>
                <Text style={{
                    paddingRight: 18,
                    paddingBottom: 8,
                    fontSize: 32,
                    fontWeight: "200",
                    color: "#00adf5"
                }}>
                    {props.content}
                </Text>
            </View>
        </TouchableHighlight>
    ); 
}