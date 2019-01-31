import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight} from 'react-native';

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.Title}> On Time </Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder={"Username"}
              onChangeText={(username) => this.setState({username})}
              editable={true}
              maxLength={40}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder={"Password"}
              onChangeText={(password) => this.setState({password})}
              password={true}
              editable={true}
              maxLength={40}
              secureTextEntry
            />
          </View>
          <TouchableHighlight style={styles.buttonContainer} onPress={this.logIn.bind(this)} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText} >Log In</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonContainer} onPress={this.logIn.bind(this)} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText} >Register</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Log In Method
  logIn = (e) => {
    let username = this.state.username;
    let password = this.state.password;
    console.log("Username: " + username);
    console.log("Password: " + password);
  }
}

function loginRequest(){
  // Traditional XMLHttpRequest
  let request = new XMLHttpRequest();
  let params = 'username=test&password=password12345';
  let url = 'https://web.csulb.edu/~tebert/teaching/spring19/419-519/lectures.html';

  request.onreadystatechange = (e) => {
    if (request.readyState !== 4) {
      return;
    }

    if (request.status === 200) {
      console.log('success', request.responseText);
    } else {
      console.warn('error');
    }
  };

  request.open('POST', url);
  request.send(params);
}

function getMoviesFromApiAsync() {
  return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.movies;
    })
    .catch((error) => {
      console.error(error);
    });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContainer:{
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 30,
    padding: 15,
    margin: 5,
    width: "100%",
    minWidth: "75%"
  },
  Title:{
    color:'lightblue',
    fontSize:50
  },
  button: {
   alignItems: 'center',
   backgroundColor: 'lightblue',
   borderRadius: 30,

  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  buttonContainer: {
    margin: 5,
    minWidth: "50%"
  }
});

export default LoginScreen;
