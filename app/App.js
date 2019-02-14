import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput} from 'react-native';
import { LoggedOut, LoggedIn } from './router';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
  }
  render() {
    if(this.state.isLoggedIn){
      return (
        <LoggedIn />
      );
    }
    else{
      return (
        <LoggedOut />
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
