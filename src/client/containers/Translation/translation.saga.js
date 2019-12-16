import { put, takeLatest, all, call } from 'redux-saga/effects';
import * as TRANSLATION_ACTION from "./translation.action";

async function callTranslation(payload){
    const googleTranslate = require('google-translate')(process.env.REACT_APP_GOOGLE_API_KEY);
    return await googleTranslate.translate(payload, 'en', function(err, translation) {
        return translation;
    });
}

function* fetchTranslation({payload}) {
    try{
        const res = yield call(callTranslation, payload);
        yield put(TRANSLATION_ACTION.getTranslationSuccess(res.data));      
    }
    catch (e){
        yield put(TRANSLATION_ACTION.getTranslationError((e.response) ? e.response.data.message : 'Get translation error'));
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(TRANSLATION_ACTION.GET_TRANSLATION, fetchTranslation)
    ]);
}
