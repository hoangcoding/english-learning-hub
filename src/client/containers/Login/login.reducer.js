import Immutable from "immutable";
import * as ActionType from './login.action';

const userInfo = JSON.parse(localStorage.getItem('user'));
const initialState = Immutable.fromJS({
    isLoading: false,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    error: '',
    userInfo
});

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case ActionType.LOGIN_REQUEST:
            return state.set('isLoading', true);
        case ActionType.LOGIN_SUCCESS:
            return state.merge({
                isAuthenticated: true,
                userInfo: payload,
                error: '',
                isLoading: false
            });
        case ActionType.LOGIN_ERROR:
            return state.merge({
                error: payload,
                isLoading: false
            });
        case ActionType.LOGOUT_SUCCESS:
            return state.merge({
                isAuthenticated: false,
                userInfo: null,
            });
        default:
            return state;
    }
}