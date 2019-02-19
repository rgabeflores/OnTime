import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Alert,
  StatusBar,
  Platform
} from "react-native";
import firebase from "firebase";
import { db } from "../config/db";
import AppNavigator from "../navigation/AppNavigator";

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isTyping: false,
      loginSuccess: true
    };
  }

  render() {
    if (this.state.loginSuccess) {
      return (
        <View style={styles.tabContainer}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    } else {
      return (
        <View
          style={
            this.state.isTyping ? styles.containerCompressed : styles.container
          }
        >
          <View style={styles.container}>
            <View>
              <Image
                source={require("../assets/stopwatch_vector.png")}
                style={styles.image}
              />
            </View>
            <Text style={styles.Title}> On Time </Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder={"Email"}
                onChangeText={email => this.setState({ email })}
                editable={true}
                maxLength={40}
                keyboardType={"email-address"}
                onFocus={this.compressViews.bind(this)}
                onBlur={this.decompressViews.bind(this)}
              />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder={"Password"}
                onChangeText={password => this.setState({ password })}
                password={true}
                editable={true}
                maxLength={40}
                secureTextEntry
                onFocus={this.compressViews.bind(this)}
                onBlur={this.decompressViews.bind(this)}
              />
            </View>
            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={this.logIn.bind(this)}
              underlayColor="white"
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Log In</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={this.register.bind(this)}
              underlayColor="white"
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }

  // Log In Method
  logIn = e => {
    let email = this.state.email;
    let password = this.state.password;
    console.log("Email: " + email);
    console.log("Password: " + password);
    // db.ref('/x').push
    // this pushes '/x' as the 'folder name'
    // then stores the Email as 'name'
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        function(firebaseUser) {
          console.log("logged in!");

          //navigate("Home");
        },
        function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
          console.log(error);
        }
      );
  };
  register = e => {
    let email = this.state.email;
    let password = this.state.password;
    console.log("Email: " + email);
    console.log("Password: " + password);
    let firebaseAuth = firebase.auth();
    let userCredential = firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(
        // This function is called when createUserWithEmailAndPassword() returns successfully
        function(firebaseUser) {
          let userID = firebaseAuth.currentUser.uid;

          db.ref("Accounts/" + userID).set({
            email: email,
            password: password
          });
        },
        // This function is called when createUserWithEmailAndPassword() returns with an error
        function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        }
      );
  };
  compressViews = e => {
    this.setState({ isTyping: true });
  };
  decompressViews = e => {
    this.setState({ isTyping: false });
  };
}

function asyncRequest(url) {
  return fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.movies;
    })
    .catch(error => {
      console.error(error);
    });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  tabContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  containerCompressed: {
    flex: 1,
    marginBottom: "35%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  textInputContainer: {
    borderColor: "lightblue",
    borderWidth: 1,
    borderRadius: 30,
    padding: 15,
    margin: 5,
    width: "100%",
    minWidth: "75%"
  },
  Title: {
    color: "lightblue",
    fontSize: 50
  },
  image: {
    width: 150,
    height: 150
  },
  button: {
    alignItems: "center",
    backgroundColor: "lightblue",
    borderRadius: 30
  },
  buttonText: {
    padding: 20,
    color: "white"
  },
  buttonContainer: {
    margin: 5,
    minWidth: "50%"
  }
});

export default LoginScreen;
