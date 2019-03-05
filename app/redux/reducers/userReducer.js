const INITIAL_STATE = {
    user: {
        uid: "Re2ophJDDMX2yssltNZdCSz9gLz1",
        email: "gabe@gabe.com",
    },
    fetching: false,
    fetched: false,
    error: null,
};
/*
if (__DEV__) const INITIAL_STATE = {
    user: {
        uid: "",
        email: "",
    }
}
*/


export default function reducer(
    state = INITIAL_STATE, 
    action
    ){
    switch(action.type){
        case "CREATE_USER":{
            return {
                ...state,
                fetching: true
            }
        }
        case "CREATE_USER_FULFILLED":{
            return {
                ...state, 
                user: action.payload
            }
        }
        case "CREATE_USER_REJECTED":{
            return {
                ...state, 
                fetching: false, 
                error: action.payload
            }
        }
        case "FETCH_USER":{
            return {
                ...state, 
                fetching: true,
            }
        }
        case "FETCH_USER_FULFILLED":{
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                user: action.payload
            }
        }
        case "FETCH_USER_REJECTED":{
            return {
                ...state, 
                fetching: false, 
                error: action.payload
            }
        }
        case "SET_USER_EMAIL": {
            return {
                ...state, 
                user: {...state.user, email: action.payload}
            }
        }
    }
    return state;
}