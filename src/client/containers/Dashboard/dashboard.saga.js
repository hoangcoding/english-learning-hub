import { put, takeLatest, all, call, takeEvery } from 'redux-saga/effects';
import * as DASHBOARD_ACTION from "./dashboard.action";
import * as HEADER_ACTION from "../Header/header.action";

import {getProgress} from "../../libs/user.lib";
import {getRandomWords} from "../../libs/lesson.lib";

function* fetchLessons() {
    try{
        const res = yield call(getProgress);
        yield put(DASHBOARD_ACTION.loadLessonsSuccess(res.data));
    }
    catch (e){
        yield put(DASHBOARD_ACTION.loadError((e.response) ? e.response.data.message : 'Load header error'));
    }
}
function* fetchWords() {
    try{
        const res = yield call(getRandomWords, 10);
        yield put(DASHBOARD_ACTION.loadWordsSuccess(res.data));

    } catch (e){
        yield put(DASHBOARD_ACTION.loadError((e.response) ? e.response.data.message : 'Load header error'));
    }
}
export default function* rootSaga() {
    yield all([
        takeLatest(DASHBOARD_ACTION.LOAD_LESSONS, fetchLessons),
        takeLatest(DASHBOARD_ACTION.LOAD_WORDS, fetchWords)
    ]);
}
