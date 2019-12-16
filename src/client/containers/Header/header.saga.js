import { put, takeLatest, all, call, takeEvery } from 'redux-saga/effects';
import * as HEADER_ACTION from "./header.action";
import {getProgress} from '../../libs/user.lib';

function* fetchTopics() {
    try{
        const res = yield call(getProgress);
        yield put(HEADER_ACTION.loadTopicsSuccess(res.data));      
    }
    catch (e){
        yield put(HEADER_ACTION.loadTopicsError((e.response) ? e.response.data.message : 'Load header error'));
    }
}
export default function* rootSaga() {
    yield all([
        takeLatest(HEADER_ACTION.LOAD_TOPICS, fetchTopics)
    ]);
}