import {LOGIN_ERROR, LOGIN_SUCCESS} from "../Login/login.action";

const PREFIX = "AUTH_REGISTER_";


export const REGISTER_REQUEST = `${PREFIX}REGISTER_REQUEST`;
export const REGISTER_SUCCESS = `${PREFIX}REGISTER_SUCCESS`;
export const REGISTER_ERROR = `${PREFIX}REGISTER_ERROR`;

export function register(email, firstName, lastName , password) {
    return {
        type: REGISTER_REQUEST,
        payload: {email, firstName, lastName, password},
    };
}


export function registerSuccess(payload) {
    return {
        type: REGISTER_SUCCESS,
        payload,
    };
}

export function registerError(payload) {
    return {
        type: REGISTER_ERROR,
        payload,
    };
}

