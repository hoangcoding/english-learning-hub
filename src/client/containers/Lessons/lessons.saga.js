import { put, takeLatest, all, call } from 'redux-saga/effects';
import * as LESSONS_ACTION from "./lessons.action";
import {listByTopic} from '../../libs/lesson.lib';
import {addWord} from '../../libs/user.lib';

function* fetchLessons({payload}) {
    try{
        const res = yield call(listByTopic, payload);
        yield put(LESSONS_ACTION.loadLessonsSuccess(res.data));      
    }
    catch (e){
        yield put(LESSONS_ACTION.loadLessonsError((e.response) ? e.response.data.message : 'Load lessons error'));
    }
}

function* setProgress({payload}) {
    try{
        const res = yield call(addWord, payload);
        yield put(LESSONS_ACTION.setProgressSuccess(res.data));      
    }
    catch (e){
        yield put(LESSONS_ACTION.setProgressError((e.response) ? e.response.data.message : 'Set progress error'));
    }
}


export default function* rootSaga() {
    yield all([
        takeLatest(LESSONS_ACTION.LOAD_LESSONS, fetchLessons),
        takeLatest(LESSONS_ACTION.SET_PROGRESS, setProgress)
    ]);
}