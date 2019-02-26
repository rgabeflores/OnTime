import { onLogin } from "../../auth";

export function fetchUser(email, password){
    return function action(dispatch) {
        onLogin(email,password)
        .then((response) => {
            dispatch({type: "FETCH_USER_FULFILLED", payload: {uid: response.user.uid, email: response.user.email}});
        })
        .catch((err) => {
            console.log("err")
            return {type: "FETCH_USER_REJECTED", payload: err};
        });
    }
}
export function setUserEmail(email){
    return {
        type: "SET_USER_EMAIL",
        payload: email
    }
}