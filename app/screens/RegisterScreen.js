import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Alert
} from "react-native";
import { NavigationActions } from "react-navigation";

import styles from "./style";

import firebase from "firebase";
import { db } from "../config/db";

import { onRegister } from "../auth";

export class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isTyping: false
    };
  }

  render() {
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
            onPress={this.register.bind(this)}
            underlayColor="white"
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </View>
          </TouchableHighlight>
          <View>
            <TouchableHighlight
              onPress={this.goToLogin.bind(this)}
              underlayColor="white"
            >
              <View>
                <Text style={styles.linkText}>
                  Already have an account? Login Here
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
  goToLogin = e => {
    this.props.navigation.navigate("Login");
  };
  goToHome = () => {
    this.props.navigation.navigate("LoggedIn");
  };
  register = e => {
    let email = this.state.email;
    let password = this.state.password;
    console.log("Email: " + email);
    console.log("Password: " + password);
    onRegister(email, password).then(() =>
      this.props.navigation.navigate(
        "LoggedIn",
        {},
        NavigationActions.navigate({ routeName: "Main" })
      )
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   containerCompressed:{
//     flex: 1,
//     marginBottom: "45%",
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'flex-start'
//   },
//   textInputContainer:{
//     borderColor: 'lightblue',
//     borderWidth: 1,
//     borderRadius: 30,
//     padding: 15,
//     margin: 5,
//     width: "100%",
//     minWidth: "75%"
//   },
//   Title:{
//     color:'lightblue',
//     fontSize:50
//   },
//   image:{
//     width: 150,
//     height: 150
//   },
//   button: {
//    alignItems: 'center',
//    backgroundColor: 'lightblue',
//    borderRadius: 30,

//   },
//   buttonText: {
//     padding: 20,
//     color: 'white'
//   },
//   buttonContainer: {
//     margin: 5,
//     minWidth: "50%"
//   },
//   linkText:{
//     padding: 5,
//     minWidth: "50%",
//     color: 'lightblue'
//   }
// });

export default RegisterScreen;
