/**
 * User Reducer 
 */

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
    NEW_ACCOUNT
    } from '../actions/types';

// Used for the initial state of the application
const INITIAL_STATE = {
    user: {
        account: NEW_ACCOUNT,
        uid: "Re2ophJDDMX2yssltNZdCSz9gLz1"
    },
    isLoggedIn: false, // Keeps track of logged in status
    fetching: false, // Used to indicate async loading
    fetched: false, // Indicates the status of an async request
    error: null, // Used for errors
};

/**
 * This is the reducer for the user actions.
 * 
 */
export default function reducer( state = INITIAL_STATE, action){
    switch(action.type){
        case CREATE_USER: {
            return {
                ...state,
                fetching: true
            }
        }
        case CREATE_USER_FULFILLED: {
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                isLoggedIn: true,
                user: action.payload,
            }
        }
        case FETCH_USER: {
            return {
                ...state, 
                fetching: true,
            }
        }
        case FETCH_USER_FULFILLED: {
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                isLoggedIn: true,
                user: action.payload,
            }
        }
        case REQUEST_REJECTED: {
            return {
                ...state, 
                fetching: false, 
                error: action.payload
            }
        }
        case SET_USER_EMAIL: {
            return {
                ...state, 
                fetching: true
            }
        }
        case SET_USER_EMAIL_FULFILLED: {
            return {
                ...state,
                fetching: false,
                user: {
                    ...state.user, 
                    email: action.payload
                }
            }
        }
        case SET_USER_NAME: {
            return {
                ...state, 
                fetching: true
            }
        }
        case SET_USER_NAME_FULFILLED: {
            return {
                ...state,
                fetching: false,
                user: {
                    ...state.user, 
                    account: {
                        ...state.account,
                        accountInfo: {
                            ...accountInfo,
                            name: action.payload
                        }
                    }
                }
            }
        }
    }
    return state;
}