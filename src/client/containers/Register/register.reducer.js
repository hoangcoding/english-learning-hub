import Immutable from "immutable";
import * as ActionType from './register.action';

const initialState = Immutable.fromJS({
    isLoading: false,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    error: ''
});

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case ActionType.REGISTER_REQUEST:
            return state.set('isLoading', true);
        case ActionType.REGISTER_SUCCESS:
            return state.merge({
                isAuthenticated: true,
                error: '',
                isLoading: false
            });
        case ActionType.REGISTER_ERROR:
            return state.merge({
                error: payload,
                isLoading: false
            });
        default:
            return state;
    }
}