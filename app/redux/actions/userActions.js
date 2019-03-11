import { onLogin, onRegister } from '../../auth';
import { db } from '../../config/db';

import {
    CREATE_USER,
    CREATE_USER_FULFILLED,
    FETCH_USER,
    FETCH_USER_FULFILLED,
    REQUEST_REJECTED,
    SET_USER_EMAIL
    } from './types';

export function createUser(email, password){
    return (dispatch) => {
        // Sets a "loading... " state
        dispatch({ type: CREATE_USER });

        // Calls firebase function
        onRegister(email, password)
            .then((firebaseUser) => {
                // Sets state to successfully loaded
                dispatch({ type: CREATE_USER_FULFILLED, payload: firebaseUser });
            })
            .catch((err) => {
                // Sets state to failure to load
                dispatch({ type: REQUEST_REJECTED, payload: err});
            })
    }
}

export function fetchUser(email, password){
    return (dispatch) => {
        // Sets a "loading... " state
        dispatch({ type: FETCH_USER });

        // Calls firebase function
        onLogin(email,password)
            .then((firebaseUser) => {
                // Sets state to successfully loaded
                dispatch({ type: FETCH_USER_FULFILLED, payload: firebaseUser });
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