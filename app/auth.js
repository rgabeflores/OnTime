import React from 'react';
import firebase from 'firebase';
import { db } from './config/db';

export const onRegister = (email, password) => {
    let firebaseAuth = firebase.auth();
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
    // .then(
    // // This function is called when createUserWithEmailAndPassword() returns successfully
    // function(firebaseUser){
    //   let userID = firebaseAuth.currentUser.uid;
    //   db.ref('Accounts/' + userID).set({
    //     email: email,
    //     password: password
    //   });
    // },
    // // This function is called when createUserWithEmailAndPassword() returns with an error
    // function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   if (errorCode == 'auth/weak-password') {
    //     alert('The password is too weak.');
    //   } else {
    //     alert(errorMessage);
    //   }
    //   console.log(error);
    // });
}
