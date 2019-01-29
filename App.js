import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.logIn} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText} >Log In</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  // Log In Method
  logIn = () => {
    console.log("Claus")
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
   alignItems: 'center',
   backgroundColor: 'lightblue'
 },
 buttonText: {
   padding: 20,
   color: 'white'
 }
});
