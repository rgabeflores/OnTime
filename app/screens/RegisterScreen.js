import React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Modal
} from "react-native";

import { connect } from "react-redux";
import { createUser, toggleModal } from "../redux/actions/userActions";

import LoginScreen from "./LoginScreen";
import styles from "./style";

export class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
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
            {/* <Image
              source={require("../assets/stopwatch_vector.png")}
              style={styles.image}
            /> */}
          </View>
          <Text style={styles.Title}> On Time </Text>
          <View >
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder={"Name"}
                onChangeText={name => this.setState({ name })}
                editable={true}
                maxLength={40}
                onFocus={this.compressViews.bind(this)}
                onBlur={this.decompressViews.bind(this)}
              />
            </View>
          </View>
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
              onPress={this.props.toggleModal.bind(this)}
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
        <Modal
            animationType="slide"
            visible={this.props.modalVisible}
            enableEmptySections={true}
            onRequestClose={this.props.toggleModal.bind(this)}
          >
            <LoginScreen/>
          </Modal>
      </View>
    );
  }

  /**
   * Navigates to the Login screen.
   */
  goToLogin = e => {
    this.props.navigation.navigate("Login");
  };

  /**
   * Handles the register button click.
   */
  register = e => {
    let name = this.state.name;
    let email = this.state.email;
    let password = this.state.password;

    if(__DEV__){
      console.log("Email: " + email);
      console.log("Password: " + password);
    }

    // Dispatch register
    this.props.createUser(name, email, password);
  };

  /**
   * Compresses the screen elements when the user types. This allows
   * the visual elements to fit the device screen when the keyboard is open.
   */
  compressViews = e => {
    this.setState({ isTyping: true });
  };

  /**
   * Decompresses the screen elements when the user stops typing. This returns
   * the screen to its normal size.
   */
  decompressViews = e => {
    this.setState({ isTyping: false });
  };
}

// create map of  "store" object passed from Provider to this component's props
const mapStateToProps = (store) => {
  return {
    user: store.user.user, // store.user == userReducer
    isLoggedIn: store.user.isLoggedIn,
    modalVisible: store.user.modalVisible,
    fetching: store.user.fetching
  }
};

// create map of "dispatch" object passed from Provider to Redux action creators in this component's props
const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (name, email, password) => {
      dispatch(createUser(name, email, password));
    },
    toggleModal: () => {
      dispatch(toggleModal());
    }
  }
}

// connect() applies maps to component's props
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
