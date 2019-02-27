export function createUser(email,password){
    return {
        type: "CREATE_USER_FULFILLED", 
        payload: {
            uid: _uid, 
            email: _email
        }
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