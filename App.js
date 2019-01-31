import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput} from 'react-native';

export default class App extends React.Component {
  constructor(properties){
    super(properties);
    state = {
      username :  'test',
      password :  'test',
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Username"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({username})}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        <TouchableHighlight onPress={this.logIn} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText} >Log In</Text>
          </View>
        </TouchableHighlight>
          <TouchableHighlight onPress={this.register} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText} >Register</Text>
            </View>
          </TouchableHighlight>
      </View>
    );
  }
  // Log In Method
  logIn = () => {
    console.log(this.state.username)
  }
  register = () => {
    console.log(this.state.password)
  }
}

const styles = StyleSheet.create({
  inputContainer: {
      borderBottomColor: '#FFFCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  container: {
    flex: 1,
    borderRadius: 40,
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
