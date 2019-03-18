/**
 * Task Actions 
 * Actions on the user's tasks (such as edits, adds, removes, etc.) are dispatched here.
 */

import {
    ADD_TASK,
    ADD_TASK_FULFILLED,
    REMOVE_TASK,
    REMOVE_TASK_FULFILLED,
    EDIT_TASK,
    EDIT_TASK_FULFILLED,
    REQUEST_REJECTED
    } from './types';


export function addTask(task){
    return (dispatch) => {
        // Sets a "loading... " state
        dispatch({ type: ADD_TASK });

        // TO-DO: Implement Firebase Calls
        
        /* 
        dispatch({ type: ADD_TASK_FULFILLED, payload: task });

        dispatch({ type: REQUEST_REJECTED, payload: err});
        */
    }
}

export function removeTask(task){
    return (dispatch) => {
        // Sets a "loading... " state
        dispatch({ type: REMOVE_TASK });

        // TO-DO: Implement Firebase Calls

        /*
        dispatch({ type: REMOVE_TASK_FULFILLED });

        dispatch({ type: REQUEST_REJECTED, payload: err});
        */
    }
}

export function editTask(task){
    return (dispatch) => {
        dispatch({ type: EDIT_TASK });

        // TO-DO: Implement Firebase Calls

        /*
        dispatch({ type: EDIT_TASK_FULFILLED, payload: task });

        dispatch({ type: REQUEST_REJECTED, payload: err});
        */
    }
}
