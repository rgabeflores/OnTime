import React from "react";
import { Text, View, Button, containerViewStyle } from "react-native";
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
        <Button
          style={styles.settingsButton}
          title="Log Out"
          onPress={() => this.logout()}
        />
      </View>
    );
  }
}
