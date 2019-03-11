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
import { fetchUser } from "../redux/actions/userActions";

import { onLogin } from "../auth.js";
import styles from "./style";

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
    if(this.props.isLoggedIn){
      this.props.navigation.navigate(
        "LoggedIn",
        {},
        NavigationActions.navigate({ routeName: "Main" })
      );
    }
    
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
          <View>
            <TouchableHighlight
              onPress={this.goToRegister.bind(this)}
              underlayColor="white"
            >
              <View>
                <Text style={styles.linkText}>
                  Dont have an account? Register Here
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
  goToRegister = e => {
    this.props.navigation.navigate("Register");
  };
  // Log In Method
  logIn = e => {
    let email = this.state.email;
    let password = this.state.password;

    if(__DEV__){
      console.log("Email: " + email);
      console.log("Password: " + password);
    }

    // Dispatch login
    this.props.fetchUser(email, password);
  };
  compressViews = e => {
    this.setState({ isTyping: true });
  };
  decompressViews = e => {
    this.setState({ isTyping: false });
  };
}

// create map of "store" object passed from Provider to this component's props
const mapStateToProps = (store) => {
  return {
    user: store.user.user, // store.user == reducer, store.user.user == reducer.state.user
    isLoggedIn: store.user.isLoggedIn,
    fetching: store.user.fetching
  }
};

// create map of "dispatch" object passed from Provider to Redux action creators in this component's props
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (email, password) => {
      dispatch(fetchUser(email, password));
    }
  }
}

// connect() applies maps to component's props
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
