import React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight
} from "react-native";
import { NavigationActions } from "react-navigation";

import { connect } from "react-redux";
import { createUser } from "../redux/actions/userActions";


import styles from "./style";

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
    onRegister(email, password).then((firebaseUser) =>{
      console.log(firebaseUser.user.uid);
      
      // dispatch() triggers redux action
      // createUser() is a redux action creator
      this.props.dispatch(createUser(firebaseUser.user));
      this.props.navigation.navigate(
        "LoggedIn",
        {},
        NavigationActions.navigate({ routeName: "Main" })
      )
    });
    
  };
  compressViews = e => {
    this.setState({ isTyping: true });
  };
  decompressViews = e => {
    this.setState({ isTyping: false });
  };
}

// create map of  "store" object passed from Provider to this component's props
const mapStateToProps = (store) => {
  return {
    user: store.user.user, // store.user == reducer, store.user.user == reducer.state.user
  }
};

// create map of  "dispatch" object passed from Provider to this component's props
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    createUser
  }
}

// connect() applies maps to component's props
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
