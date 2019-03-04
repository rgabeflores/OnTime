import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { db } from "../config/db";
import styles from "./style";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      });
  };

  render() {
    return (
      <View>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1
          }}
        />
        <TouchableOpacity onPress={() => this.logout()}>
          <View
            style={{
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontSize: 40, fontWeight: "500", color: "black" }}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1
          }}
        />
      </View>
    );
  }
}
