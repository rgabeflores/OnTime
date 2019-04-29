/**
 * Task Reducer
 */

import {
  ADD_TASK,
  ADD_TASK_FULFILLED,
  REMOVE_TASK,
  REMOVE_TASK_FULFILLED,
  EDIT_TASK,
  EDIT_TASK_FULFILLED,
  REQUEST_REJECTED,
  SET_USER_NAME,
  SET_USER_NAME_FULFILLED
} from "../actions/types";

// Used for the initial state of the application
const INITIAL_STATE = {
  tasks: {},
  fetching: false, // Used to indicate async loading
  fetched: false, // Indicates the status of an async request
  error: null // Used for errors
};

/**
 * This is the reducer for the user actions.
 *
 */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TASK: {
      return {
        ...state,
        fetching: true
      };
    }
    case ADD_TASK_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        task: action.payload
      };
    }
    case REMOVE_TASK: {
      return {
        ...state,
        fetching: true
      };
    }
    case REMOVE_TASK_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true
      };
    }
    case EDIT_TASK: {
      return {
        ...state,
        fetching: true
      };
    }
    case EDIT_TASK_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        task: action.payload
      };
    }
    case REQUEST_REJECTED: {
      return {
        ...state,
        fetching: false,
        fetched: false,
        err: action.payload
      };
    }
  }
  return state;
}
