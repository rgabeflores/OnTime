import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { db } from "../config/db";

import { connect } from "react-redux";

import styles from "./style";

export class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };
  constructor(props) {
    super(props);
    this.state = {
      tasks: { name: "name", pass: "pass" },
      test: "test"
    };
  }

  componentDidMount() {
    this.printTask();
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
    let newState = [];
    db.ref("Test/").once("value", snapshot => {
      console.log(snapshot.val());
      newState.push({ name: snapshot.val().name, pass: snapshot.val().pass });
      // this.props.navigation.navigate("Timer");
    });
    this.setState({ tasks: newState });
    console.log(this.state.tasks.name);
  };

  render() {
    if (__DEV__) console.log(this.props.user);
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
            Add
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.printTask}>
          <View style={{ backgroundColor: "white" }} />
          <Text style={{ fontSize: 40, fontWeight: "500" }}>
            print:{this.state.tasks.name}
          </Text>
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

// create map of "store" object passed from Provider to this component's props
const mapStateToProps = store => {
  return {
    user: store.user.user // store.user == reducer, store.user.user == reducer.state.user
  };
};

// create map of "dispatch" object passed from Provider to this component's props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch
//   }
// }

// connect() applies maps to component's props
export default connect(mapStateToProps)(SettingsScreen);
