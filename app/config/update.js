import React from 'react';

import firebase from 'firebase';
import { db } from './db';

/*
    Methods to update user information in Firebase
*/

/**
 * Changes or set's the user's name
 * @param {String} uid the user's UID
 * @param {String} name the new name
 */
export const setName = (uid, name) => {
    let userRef = db.ref("Accounts/" + uid +"/accountInfo");
    return userRef.update({ name: name });
} 

/**
 * Changes or sets the user's email
 * @param {String} email the new email
 */
export const setEmail = (email) => {
    return firebase.auth().currentUser.updateEmail(email);
}

/**
 * Changes or sets the user's password
 * @param {String} password the new password
 */
export const setPassword = (password) => {
    return firebase.auth().currentUser.updatePassword(password);
}

/**
 * Sends a password reset email.
 * @param {String} email the user's email
 */
export const resetPassword = (email) => {
    return firebase.auth().sendPasswordResetEmail(email)
        .then(function() {
            // Email sent.
        }).catch(function(error) {
            // An error happened.
        });
}

/**
 * Deletes the current user's account.
 */
export const deleteAccount = (credential) =>{

    let user = firebase.auth().currentUser;

    // Re-authenticate a user before deleting the account
    // Use for security sensitive precaution
    user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
        // User re-authenticated.
      }).catch(function(error) {
        // An error happened.
      });

    user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
        // User re-authenticated.
      }).catch(function(error) {
        // An error happened.
      })
    return firebase.auth().currentUser.delete()
        .then(() => {
            // Account successfully deleted
        })
        .catch(() => {
            // error
        });
}
export default firebase.auth();