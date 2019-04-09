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
    return firebase.auth().signInWithEmailAndPassword(email,password);        
}

export const createTask = (uid, task) => {
    return db.ref("/Accounts/" + uid + "/tasks/")
        .child(task.title)
        .set({
            hours: task.hours,
            address: task.address
      });
}

export default firebase.auth();