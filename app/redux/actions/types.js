/**
 * Action Types
 */

export const TOGGLE_MODAL = "TOGGLE_MODAL";

// USER ACTION TYPES
export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_FULFILLED = "CREATE_USER_FULFILLED";
export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_FULFILLED = "FETCH_USER_FULFILLED";
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_USER_EMAIL_FULFILLED = "SET_USER_EMAIL_FULFILLED";
export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_NAME_FULFILLED = "SET_USER_NAME_FULFILLED";
export const LOGOUT = "LOGOUT";


// TASK ACTION TYPES
export const ADD_TASK = "ADD_TASK";
export const ADD_TASK_FULFILLED = "ADD_TASK_FULFILLED";
export const REMOVE_TASK = "REMOVE_TASK";
export const REMOVE_TASK_FULFILLED = "REMOVE_TASK_FULFILLED";
export const EDIT_TASK = "EDIT_TASK";
export const EDIT_TASK_FULFILLED = "EDIT_TASK_FULFILLED";


// ASYNC ACTION TYPES
export const REQUEST_REJECTED = "REQUEST_REJECTED";


// DEFAULT ACCOUNT DATABSE ENTRY
export const NEW_ACCOUNT = {
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
        taskDates: {
          "2019-03-06": [
            { 
              name: "My First Task",
              time: "21:00",
              description: "This is my first task.",
              location: {
                city: "Long Beach",
                state: "CA",
                streetAddress: "1250 Bellflower Blvd",
                zipcode: 90840,
              }
             },
            { 
              name: "My Second Task",
              time: "12:00",
              description: "This is my second task.",
              location: {
                city: "Long Beach",
                state: "CA",
                streetAddress: "1250 Bellflower Blvd",
                zipcode: 90840,
              }
            },
            { 
              name: "My Third Task",
              time: "14:00",
              description: "This is my third task.",
              location: {
                city: "Long Beach",
                state: "CA",
                streetAddress: "1250 Bellflower Blvd",
                zipcode: 90840,
              }
            }
          ],
          "2019-04-24": [
            { 
              name: "My First Task",
              time: "14:00",
              description: "This is my first task.",
              location: {
                city: "Long Beach",
                state: "CA",
                streetAddress: "1250 Bellflower Blvd",
                zipcode: 90840,
              }
             },
            { 
              name: "My Second Task",
              time: "16:00",
              description: "This is my second task.",
              location: {
                city: "Long Beach",
                state: "CA",
                streetAddress: "1250 Bellflower Blvd",
                zipcode: 90840,
              }
            },
            { 
              name: "My Third Task",
              time: "21:00",
              description: "This is my third task.",
              location: {
                city: "Long Beach",
                state: "CA",
                streetAddress: "1250 Bellflower Blvd",
                zipcode: 90840,
              }
            }
          ],
          "2019-04-25": [
            { 
              name: "My First Task",
              time: "16:00",
              description: "This is my first task.",
              location: {
                city: "Long Beach",
                state: "CA",
                streetAddress: "1250 Bellflower Blvd",
                zipcode: 90840,
              }
             },
            { 
              name: "My Second Task",
              time: "13:00",
              description: "This is my second task.",
              location: {
                city: "Long Beach",
                state: "CA",
                streetAddress: "1250 Bellflower Blvd",
                zipcode: 90840,
              }
            }
          ]
        },
};