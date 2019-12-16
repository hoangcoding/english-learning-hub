import {
    all, put, call, takeLatest, takeEvery, take, select, fork, cancel
} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';
import {sumBy} from 'lodash';
import * as GAME_ACTION from "./game.action";
import {getRandomWords} from '../../libs/lesson.lib';
import {GAME_LEVEL} from '../../config/constants';

localStorage.iv = undefined;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function* handleSinglePlayer() {
    try {
        yield put(GAME_ACTION.setIsMultiPlayer(false));
        yield put(GAME_ACTION.loadGameData());
    } catch (e) {
        yield put(GAME_ACTION.gameError((e)));
    }
}

function* handleMultiPlayers() {
    try {

    } catch (e) {
        yield put(GAME_ACTION.gameError((e)));
    }
}

function countdown(current) {
    return eventChannel(emitter => {
            const iv = setInterval(() => {
                current -= 1;
                if (current >= 0) {
                    emitter(current);
                } else {
                    emitter(END);
                }
            }, 1000);
            localStorage.iv = iv;
            return () => {
                clearInterval(iv);
                localStorage.iv = undefined;
            }
        }
    )
}
function* tick() {
    while(true) {
        yield call(delay, 1000);
        yield put(GAME_ACTION.increaseTimer());
    }
}
function* timer() {
    try{
        // starts the task in the background
        const bgSyncTask = yield fork(tick);

        // wait for the user stop action
        yield take(GAME_ACTION.STOP_TIMER);
        // user clicked stop. cancel the background task
        // this will throw a SagaCancellationException into task
        yield cancel(bgSyncTask);
    } catch (e) {
    }
}
function* handleGameStart() {
    try {
        clearInterval(localStorage.iv);
        localStorage.iv = undefined;

        const isMultiPlayer = yield select(state => state.game.get('isMultiPlayer'));
        const gameState = yield select(state => state.game.get('gameState'));
        if(isMultiPlayer && gameState === GAME_ACTION.GAME_STATE.PAUSE) {
            yield put(GAME_ACTION.socketResumeGame());
        }
        yield put(GAME_ACTION.setGameState(GAME_ACTION.GAME_STATE.IN_PROGRESS));

        if(!isMultiPlayer) {
            const getCurrentLevel = yield select(state => state.game.get('level'));
            const timeLimit = yield select(state => state.game.getIn(['gameData', getCurrentLevel, 'timeLeft']));
            const chan = yield call(countdown, timeLimit);
            try {
                while (true) {
                    yield take(chan);
                    yield put(GAME_ACTION.deductTime(getCurrentLevel, 1));
                }
            } finally {
                const timeLimit = yield select(state => state.game.getIn(['gameData', getCurrentLevel, 'timeLeft']));
                if (timeLimit === 0) yield put(GAME_ACTION.roundFinished());
            }
        } else {
            yield timer();
        }
    } catch (e) {
        yield put(GAME_ACTION.gameError((e)));
    }
}

function* handleStopTimer() {
    try {
        clearInterval(localStorage.iv);
        localStorage.iv = undefined;
    } catch (e) {
        yield put(GAME_ACTION.gameError((e)));
    }
}

function* handleGamePause() {
    try {
        clearInterval(localStorage.iv);
        localStorage.iv = undefined;
        yield put(GAME_ACTION.stopTimer());
        yield put(GAME_ACTION.setGameState(GAME_ACTION.GAME_STATE.PAUSE));

    } catch (e) {
        yield put(GAME_ACTION.gameError((e)));
    }
}

function* handleRoundFinished() {
    try {
        const getCurrentLevel = yield select(state => state.game.get('level'));
        const totalMatches = yield select(state => state.game.getIn(['gameData', getCurrentLevel, 'totalMatches']));
        const amount = yield select(state => state.game.getIn(['gameData', getCurrentLevel, 'amount']));
        if (totalMatches === amount) {
            if (GAME_LEVEL.length - 1 > getCurrentLevel) yield put(GAME_ACTION.setGameLevel(getCurrentLevel + 1));
            else {
                clearInterval(localStorage.iv);
                localStorage.iv = undefined;
                yield put(GAME_ACTION.setGameState(GAME_ACTION.GAME_STATE.FINISHED));
            }
        } else {
            clearInterval(localStorage.iv);
            localStorage.iv = undefined;
            yield put(GAME_ACTION.setGameState(GAME_ACTION.GAME_STATE.OVER));
        }

    } catch (e) {
        yield put(GAME_ACTION.gameError((e)));
    }
}

function* handleSetGameLevel({payload}) {
    try {
        yield put(GAME_ACTION.setGameLevelSuccess(payload));
        yield put(GAME_ACTION.clearCellPicks(true));
        yield put(GAME_ACTION.gameStart());
    } catch (e) {
        yield put(GAME_ACTION.gameError((e)));
    }
}

function* handleWordMatch({payload}) {
    try {

        yield put(GAME_ACTION.increaseMatchCountSuccess(payload));
        const totalMatches = yield select(state => state.game.getIn(['gameData', payload, 'totalMatches']));
        const amount = yield select(state => state.game.getIn(['gameData', payload, 'amount']));
        if (amount === totalMatches) {
            if (GAME_LEVEL.length - 1 > payload) yield put(GAME_ACTION.setGameLevel(payload + 1));
            else {
                clearInterval(localStorage.iv);
                localStorage.iv = undefined;
                yield put(GAME_ACTION.stopTimer());
                yield put(GAME_ACTION.setGameState(GAME_ACTION.GAME_STATE.FINISHED));
                yield put(GAME_ACTION.socketGameFinished());

            }
        }
    } catch (e) {
        yield put(GAME_ACTION.gameError((e)));
    }
}

function* handleLoadGameData() {
    try {
        const res = yield call(getRandomWords, sumBy(GAME_LEVEL, level => level.amount));
        const data = res.data;
        let currentPos = 0;
        const levels = [];
        GAME_LEVEL.forEach((level, index) => {
            const chunk = data.slice(currentPos, currentPos + level.amount);
            currentPos = currentPos + chunk.length;
            const processedChunk = {};
            chunk.map(lesson => {
                processedChunk[`${lesson._id}-word`] = {
                    data: lesson.word,
                    type: 'word',
                    isMatch: false,
                    isFlipped: false,
                };
                processedChunk[`${lesson._id}-image`] = {
                    data: lesson.image,
                    type: 'image',
                    isMatch: false,
                    isFlipped: false,
                }
            });
            levels[index] = {
                amount: level.amount,
                totalMatches: 0,
                timeLeft: level.time,
                data: processedChunk,
            };
        });
        yield put(GAME_ACTION.loadGameDataSuccess(levels));
        const isMultiPlayer = yield select(state => state.game.get('isMultiPlayer'));
        if(!isMultiPlayer) yield put(GAME_ACTION.setGameState(GAME_ACTION.GAME_STATE.READY));

    } catch (e) {
        yield put(GAME_ACTION.gameError((e.response) ? e.response.data.message : 'Connection error'));
    }
}
function* handleOpponentFinishGame() {
    try {
        yield put(GAME_ACTION.stopTimer());
        yield put(GAME_ACTION.setGameState(GAME_ACTION.GAME_STATE.OVER));
    }catch (e) {

    }
}
function* handlePlayerWin() {
    try {
        yield put(GAME_ACTION.stopTimer());
        yield put(GAME_ACTION.setGameState(GAME_ACTION.GAME_STATE.FINISHED));
    }catch (e) {

    }
}
export default function* rootSaga() {
    yield all([
        takeEvery(GAME_ACTION.GO_SINGLE_PLAYER, handleSinglePlayer),
        takeEvery(GAME_ACTION.GO_MULTI_PLAYERS, handleMultiPlayers),
        takeEvery(GAME_ACTION.LOAD_GAME_DATA, handleLoadGameData),
        takeEvery(GAME_ACTION.GAME_START, handleGameStart),
        takeEvery(GAME_ACTION.GAME_PAUSE, handleGamePause),
        takeEvery(GAME_ACTION.EXIT, handleStopTimer),
        takeEvery(GAME_ACTION.ROUND_FINISHED, handleRoundFinished),
        takeEvery(GAME_ACTION.SET_GAME_LEVEL, handleSetGameLevel),
        takeEvery(GAME_ACTION.INCREASE_MATCH_COUNT, handleWordMatch),
        takeEvery(GAME_ACTION.OPPONENT_FINISH_GAME, handleOpponentFinishGame),
        takeEvery(GAME_ACTION.SOCKET_PLAYER_WIN, handlePlayerWin),

    ]);
};