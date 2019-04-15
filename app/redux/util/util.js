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

export const createTask = (uid, date, task) => {
    // TO-DO: Update data format to satisfy calendar format
    return db.ref("/Accounts/" + uid + "/taskDates/")
        .child(date)
        .set({
            ...date,
            
        });
}

export default firebase.auth();