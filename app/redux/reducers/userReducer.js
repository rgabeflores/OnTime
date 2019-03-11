import {
    CREATE_USER,
    CREATE_USER_FULFILLED,
    FETCH_USER,
    FETCH_USER_FULFILLED,
    REQUEST_REJECTED,
    SET_USER_EMAIL
    } from '../actions/types';

// Used for the initial state of the application
const INITIAL_STATE = {
    user: {
        uid: "Re2ophJDDMX2yssltNZdCSz9gLz1",
        email: "gabe@gabe.com",
    },
    isLoggedIn: false, // Keeps track of logged in status
    fetching: false, // Used to indicate async loading
    fetched: false, // Indicates the status of an async request
    error: null, // Used for errors
};

export default function reducer( state = INITIAL_STATE, action){
    switch(action.type){
        case CREATE_USER:{
            return {
                ...state,
                fetching: true
            }
        }
        case CREATE_USER_FULFILLED:{
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                isLoggedIn: true,
                user: action.payload,
            }
        }
        case FETCH_USER:{
            return {
                ...state, 
                fetching: true,
            }
        }
        case FETCH_USER_FULFILLED:{
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                isLoggedIn: true,
                user: action.payload,
            }
        }
        case REQUEST_REJECTED:{
            return {
                ...state, 
                fetching: false, 
                error: action.payload
            }
        }
        case SET_USER_EMAIL: {
            return {
                ...state, 
                user: {
                    ...state.user, 
                    email: action.payload
                }
            }
        }
    }
    return state;
}