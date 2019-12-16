import {
    all, put, call, takeLatest
} from 'redux-saga/effects';
import {auth} from "../../libs/user.lib";
import {push} from "connected-react-router";
import * as REGISTER_ACTION from "./register.action";
import {loginSuccess} from "../Login/login.action";

function* handleRegister({payload}) {
    try {
        const res = yield call(auth, payload, 'register');
        localStorage.setItem('accessToken', res.headers.authorization);
        localStorage.setItem('refreshToken', res.headers['x-refresh-token']);
        localStorage.setItem('user', JSON.stringify(res.data));
        yield put(push('/'));
        yield put(REGISTER_ACTION.registerSuccess(res.data));

        yield put(loginSuccess(res.data));
    } catch (e) {
        yield put(REGISTER_ACTION.registerError((e.response) ? e.response.data.message : 'Connection error'));
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(REGISTER_ACTION.REGISTER_REQUEST, handleRegister),
    ]);
};
