import React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight
} from "react-native";

import { connect } from "react-redux";

import { fetchUser } from "../redux/actions/userActions";

import styles from "./style";

import { onLogin } from "../auth";


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
    console.log("Email: " + email);
    console.log("Password: " + password);
    // onLogin(email, password).then(() =>
    //   this.props.navigation.navigate(
    //     "LoggedIn",
    //     {},
    //     NavigationActions.navigate({ routeName: "Main" })
    //   )
    // );

    // SEE ERRORS
    this.props.fetchUser(email,password);
    console.log("uid: " + this.props.user.uid);
    console.log("email: " + this.props.user.email);
  };
  compressViews = e => {
    this.setState({ isTyping: true });
  };
  decompressViews = e => {
    this.setState({ isTyping: false });
  };
}

const mapStateToProps = (store) => {
  return {
    user: store.user.user, // store.user == reducer, store.user.user == reducer.state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser
  }
}
export default connect(mapStateToProps, {fetchUser})(LoginScreen);
