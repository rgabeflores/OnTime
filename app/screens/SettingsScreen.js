import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { db } from "../config/db";
import styles from "./style";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      });
  };
  addTask = (name1, pass1) => {
    db.ref("Test/")
      .push({ name: name1, pass: pass1 })
      .then(data => {
        console.log("data ", data);
      })
      .catch(error => {
        console.log("error ", error);
      });
    // console.log(name1 + " " + pass1);
  };

  printTask = () => {
    // var that = this;
    // db.ref("Test/").on("value", function(snapshot) {
    //   let dbTasks = snapshot.val();
    //   that.setState({ tasks: dbTasks });
    // });
    this.props.navigation.navigate("Timer");
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.logout()}>
          <View
            style={{
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              borderBottomColor: "black",
              borderBottomWidth: 1
            }}
          >
            <Text style={{ fontSize: 40, fontWeight: "500", color: "black" }}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.addTask("john", "doe")}>
          <View style={{ backgroundColor: "white" }} />
          <Text style={{ fontSize: 40, fontWeight: "300", color: "green" }}>
            fuck off
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.printTask()}>
          <View style={{ backgroundColor: "white" }} />
          <Text style={{ fontSize: 40, fontWeight: "500" }}>Press me</Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 40, fontWeight: "300", color: "blue" }} />
          </TouchableOpacity>
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
