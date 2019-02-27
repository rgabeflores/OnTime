import { onLogin, onRegister } from "../../auth";

export function createUser(email,password){
    return function action(dispatch){
        return onRegister(email,password)
        .then((response) => {
            dispatch({type: "CREATE_USER_FULFILLED", payload: {uid: response.user.uid, email: response.user.email}});
        })
        .catch((err) => {
            dispatch({type: "CREATE_USER_REJECTED", payload: err});
        });
    }
}

export function fetchUser(_uid, _email){
    return {
        type: "FETCH_USER_FULFILLED", 
        payload: {
            uid: _uid, 
            email: _email
        }
    }
}
export function setUserEmail(email){
    return {
        type: "SET_USER_EMAIL",
        payload: email
    }
}