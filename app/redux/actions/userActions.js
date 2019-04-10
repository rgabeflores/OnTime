/**
 * User Actions
 */

import { 
    onLogin,
    onRegister,
    createTask
 } from '../util/util';
import {
    setName,
    setEmail,
    setPassword,
    resetPassword,
    deleteAccount
 } from '../../config/update';
import { db } from '../../config/db';

import {
    CREATE_USER,
    CREATE_USER_FULFILLED,
    FETCH_USER,
    FETCH_USER_FULFILLED,
    REQUEST_REJECTED,
    SET_USER_EMAIL,
    SET_USER_EMAIL_FULFILLED,
    SET_USER_NAME,
    SET_USER_NAME_FULFILLED,
    NEW_ACCOUNT,
    ADD_TASK,
    ADD_TASK_FULFILLED
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
                // Create new entry in Firebase for user account info
                let userRef = db.ref('Accounts/' + firebaseUser.user.uid);

                // Create account info
                let account = {
                    ...NEW_ACCOUNT,
                    accountInfo: {
                        email: email,
                        name: name
                    }
                }
                // Save account info to Firebase
                userRef.set(account);

                // Sets state to successfully loaded
                dispatch({ 
                    type: CREATE_USER_FULFILLED, 
                    payload: {
                        uid: firebaseUser.user.uid, // Save UID
                        account: account // Save new account info
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

        // Calls Firebase function
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
                                account: dataSnapshot.val(), // Save account info
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

export function addTask(uid, task){
    return (dispatch) => {
        // Sets a "loading... " state
        dispatch({ type: ADD_TASK });

        createTask(uid, task)
            .then((response) => {
                dispatch({ type: ADD_TASK_FULFILLED, payload: task });
            })
            .catch((err) => {
                // Sets state to failure to load
                dispatch({ type: REQUEST_REJECTED, payload: err});
            })
    }
}

/*
    TO-DO: These methods need to be implemented
*/

export function setUserEmail(email){
    return (dispatch) => {
        dispatch({ type: SET_USER_EMAIL });


    }
}
export function setUserName(name){
    return (dispatch) => {
        dispatch({ type: SET_USER_NAME });

        setName(name)
            .then((response) => {
                dispatch({
                    type: SET_USER_NAME_FULFILLED,
                    payload: name
                })
            })
            .catch((err) => {
                dispatch({
                    type: REQUEST_REJECTED,
                    payload: err
                })
            })
    }
    
}