import { all } from "redux-saga/effects";
import loginSagas from '../containers/Login/login.saga';
import registerSagas from '../containers/Register/register.saga';
import gameSagas from '../containers/Game/game.saga';
import headerSagas from '../containers/Header/header.saga';
import lessonsSagas from '../containers/Lessons/lessons.saga';
import gameSocketSagas from '../containers/Game/game.socket.saga';
import translationSagas from '../containers/Translation/translation.saga';
import dashboardSagas from '../containers/Dashboard/dashboard.saga';

export default function* rootSaga(getState) {
    yield all([
        loginSagas(),
        registerSagas(),
        gameSagas(),
        headerSagas(),
        lessonsSagas(),
        gameSocketSagas(),
        translationSagas(),
        dashboardSagas()
    ]);
}