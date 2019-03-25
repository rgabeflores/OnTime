import React from 'react';

import firebase from 'firebase';
import { db } from './db';

export const setName = (uid, name) => {
    let userRef = db.ref("Accounts/" + uid +"/accountInfo");
    return userRef.update({ name: name });
} 

export default firebase.auth();