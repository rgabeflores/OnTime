/**
 * User Actions
 */

import { onLogin, onRegister } from '../../auth';
import { db } from '../../config/db';

import {
    CREATE_USER,
    CREATE_USER_FULFILLED,
    FETCH_USER,
    FETCH_USER_FULFILLED,
    REQUEST_REJECTED,
    SET_USER_EMAIL,
    NEW_ACCOUNT
    } from './types';

/**
 * This action creates a Firebase user account.
 * @param {String} email The user's email
 * @param {String} password The user's password
 */
export function createUser(name, email, password){
    return (dispatch) => {
        // Sets a "loading... " state
        dispatch({ type: CREATE_USER });

        // Calls firebase function
        onRegister(email, password)
            .then((firebaseUser) => {
                let account = {
                    ...NEW_ACCOUNT,
                    accountInfo: {
                        email: email,
                        name: name
                    }
                }
                let userRef = db.ref('Accounts/' + firebaseUser.user.uid);
                userRef.set(account);
                // Sets state to successfully loaded
                dispatch({ 
                    type: CREATE_USER_FULFILLED, 
                    payload: {
                        uid: firebaseUser.user.uid, // Save UID
                        account: account
                    } 
                });
            })
            .catch((err) => {
                // Sets state to failure to load
                dispatch({ type: REQUEST_REJECTED, payload: err});
            })
    }
}

/**
 * This action logs into a Firebase user account.
 * @param {String} email The user's email
 * @param {String} password The user's password
 */
export function fetchUser(email, password){
    return (dispatch) => {
        // Sets a "loading... " state
        dispatch({ type: FETCH_USER });

        // Calls firebase function
        onLogin(email,password)
            .then((firebaseUser) => {
                let userRef = db.ref('Accounts/'+firebaseUser.user.uid);
                // Load the user account info into state
                userRef.once('value') 
                    .then((dataSnapshot) =>{
                        dispatch({
                            type: FETCH_USER_FULFILLED, // Sets state to successfully loaded
                            payload: { 
                                uid: firebaseUser.user.uid, // Save UID
                                account: dataSnapshot.val() // Save account info
                            }
                        });
                    });
            })
            .catch((err) => {
                // Sets state to failure to load
                dispatch({ type: REQUEST_REJECTED, payload: err});
            })
    }
}


export function setUserEmail(email){
    return {
        type: SET_USER_EMAIL,
        payload: email
    }
}