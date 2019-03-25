import React from 'react';

import firebase from 'firebase';
import { db } from './config/db';

export const onRegister = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
    
}
export const onLogin = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email,password);        
}

export default firebase.auth();