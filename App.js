import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight} from 'react-native';

import {LoginScreen} from 'LoginScreen';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

  }

  render() {
    return (
      <LoginScreen />
    );
  }
  // Log In Method
  logIn = (e) => {
    let username = this.state.username;
    let password = this.state.password;
    console.log("Username: " + username);
    console.log("Password: " + password);

    // // Traditional XMLHttpRequest
    // let request = new XMLHttpRequest();
    // let params = 'username=test&password=password12345';
    // let url = 'https://web.csulb.edu/~tebert/teaching/spring19/419-519/lectures.html';

    // request.onreadystatechange = (e) => {
    //   if (request.readyState !== 4) {
    //     return;
    //   }

    //   if (request.status === 200) {
    //     console.log('success', request.responseText);
    //   } else {
    //     console.warn('error');
    //   }
    // };

    // request.open('POST', url);
    // request.send(params);
  }
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
    borderColor: '#111',
    borderWidth: 1,
    borderRadius: 3,
    padding: 15,
    margin: 5,
    width: "100%",
    minWidth: "75%"
  },
  button: {
   alignItems: 'center',
   backgroundColor: 'lightblue'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  buttonContainer: {

  }
});
