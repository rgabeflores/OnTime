export function createUser(user){
    return {
        type: "CREATE_USER_FULFILLED", 
        payload: user
    }
}

export function fetchUser(user){
    return {
        type: "FETCH_USER_FULFILLED", 
        payload: user
    }
}
export function setUserEmail(email){
    return {
        type: "SET_USER_EMAIL",
        payload: email
    }
}