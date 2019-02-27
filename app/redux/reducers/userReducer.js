export default function reducer(
    state={
        user: {
            uid: "",
            email: "",
        },
        fetching: false,
        fetched: false,
        error: null,
    }, 
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
                user: {
                    uid: action.payload.uid,
                    email: action.payload.email,
                    fetched: true
                }
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
                uid: action.payload.uid,
                email: action.payload.email
            }
        }
        case "FETCH_USER_FULFILLED":{
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                user: {
                    uid: action.payload.uid,
                    email: action.payload.email
                }
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