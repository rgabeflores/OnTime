import React from 'react';

import firebase from 'firebase';
import { db } from '../../config/db';

/*
    These methods are used for interacting with firebase
*/

export const onRegister = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);

}
export const onLogin = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

export const createTask = (uid, date, newTask) => {
    var userRef = db.ref("/Accounts/" + uid + "/taskDates/" + date + "/");

    return userRef.once("value", snapshot => {
        var taskList = snapshot.val();
        if (taskList == null) taskList = [];
        userRef.child(taskList.length).set(newTask);
    })
}

/**
 * Log out the current user.
 */
export const logout = () => {
    return firebase.auth().signOut()
}

export default firebase.auth();