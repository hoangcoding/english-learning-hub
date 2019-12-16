const PREFIX = "AUTH_LOGIN_";


export const LOGIN_REQUEST = `${PREFIX}LOGIN_REQUEST`;
export const LOGIN_ERROR = `${PREFIX}LOGIN_ERROR`;
export const LOGIN_SUCCESS = `${PREFIX}LOGIN_SUCCESS`;

export const LOGOUT_REQUEST = `${PREFIX}LOGOUT_REQUEST`;
export const LOGOUT_ERROR = `${PREFIX}LOGOUT_ERROR`;
export const LOGOUT_SUCCESS = `${PREFIX}LOGOUT_SUCCESS`;

export function login(email, password) {
    return {
        type: LOGIN_REQUEST,
        payload: {email, password},
    };
}

export function loginSuccess(payload) {
    return {
        type: LOGIN_SUCCESS,
        payload,
    };
}

export function loginError(payload) {
    return {
        type: LOGIN_ERROR,
        payload,
    };
}

export function redirect() {
    return dispatch => dispatch();
}

export function logout() {
    return {
        type: LOGOUT_REQUEST,
    };
}
export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS,
    };
}
export function logoutError(payload) {
    return {
        type: LOGOUT_ERROR,
        payload
    };
}
