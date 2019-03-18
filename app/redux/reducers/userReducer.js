/**
 * User Reducer 
 */

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
       account: {
         accountInfo: {
           email: "gabe@gabe.com",
           name: "Gabe",
         },
         accountSettings: {
           isPremium: false,
           loggedIn: false,
           stayLoggedIn: true,
         },
         statistics: {
           averageHours: 0,
           numCompleteTasks: 0,
           numIncompleteTasks: 0,
           totalHours: 0,
           totalTasks: 0,
         },
         tasks: {
           task1: {
             dateEnd: "end date",
             dateStart: "start date",
             description: "This is my first task.",
             location: {
               city: "Long Beach",
               state: "CA",
               streetAddress: "1250 Bellflower Blvd",
               zipcode: 90840,
             },
             name: "My First Task",
           },
           task2: {
             name: "My Second Task",
           },
           task3: {
             description: "This is my third task",
             name: "My Third Task",
           },
         },
       },
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
                user: {
                    ...state.user, 
                    email: action.payload
                }
            }
        }
    }
    return state;
}