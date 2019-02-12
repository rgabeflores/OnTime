import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight, Alert} from 'react-native';
import firebase from 'firebase';
import { db } from '../config/db';

export class LoginScreen extends React.Component {
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
      <View style={(this.state.isTyping) ? styles.containerCompressed : styles.container}>
        <View style={styles.container}>
          <View>
            <Image source={require('../assets/stopwatch_vector.png')} style={styles.image}/>
          </View>
          <Text style={styles.Title}> On Time </Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder={"Email"}
              onChangeText={(email) => this.setState({email})}
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
              onChangeText={(password) => this.setState({password})}
              password={true}
              editable={true}
              maxLength={40}
              secureTextEntry
              onFocus={this.compressViews.bind(this)}
              onBlur={this.decompressViews.bind(this)}
            />
          </View>
          <TouchableHighlight style={styles.buttonContainer} onPress={this.logIn.bind(this)} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText} >Log In</Text>
            </View>
          </TouchableHighlight>
          <View>
            <TouchableHighlight onPress={this.goToRegister.bind(this)} underlayColor="white">
              <View>
                <Text style={styles.linkText}>Dont have an account? Register Here</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
  goToRegister = (e) => {
    this.props.navigation.navigate('Register');
  }
  // Log In Method
  logIn = (e) => {
    let email = this.state.email;
    let password = this.state.password;
    console.log("Email: " + email);
    console.log("Password: " + password);
    // db.ref('/x').push
    // this pushes '/x' as the 'folder name'
    // then stores the Email as 'name'
    firebase.auth().signInWithEmailAndPassword(email,password).then(
      function(firebaseUser){
        console.log("logged in!")
        navigate("Home");
      },
      function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        console.log(error);
    });
  }
  compressViews = (e) =>{
    this.setState({isTyping : true})
  }
  decompressViews = (e) =>{
    this.setState({isTyping : false})
  }

  register = () =>{
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(
      email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
  }
}

function asyncRequest(url) {
  return fetch(url)
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
  containerCompressed:{
    flex: 1,
    marginBottom: "45%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
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
  image:{
    width: 150,
    height: 150
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
  },
  linkText:{
    padding: 5,
    minWidth: "50%",
    color: 'lightblue'
  }
});

export default LoginScreen;
