import {
    all, put, call, takeLatest
} from 'redux-saga/effects';
import * as LOGIN_ACTION from "./login.action";
import {auth, logout} from '../../libs/user.lib';
import { push } from 'connected-react-router'

function* handleLogin({payload}) {
    try {
        const res = yield call(auth, payload, 'login');

        localStorage.setItem('accessToken', res.headers.authorization);
        localStorage.setItem('refreshToken', res.headers['x-refresh-token']);
        localStorage.setItem('user', JSON.stringify(res.data));
        yield put(push('/'));
        yield put(LOGIN_ACTION.loginSuccess(res.data));
    } catch (e) {
        yield put(LOGIN_ACTION.loginError((e.response) ? e.response.data.message : 'Connection error'));
    }
}

function* handleLogout() {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        yield call(logout, {refreshToken});

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        yield put(push('/'));
        yield put(LOGIN_ACTION.logoutSuccess());
    } catch (e) {
        yield put(LOGIN_ACTION.logoutError((e.response) ? e.response.data.message : 'Connection error'));
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(LOGIN_ACTION.LOGIN_REQUEST, handleLogin),
        takeLatest(LOGIN_ACTION.LOGOUT_REQUEST, handleLogout),
    ]);
};