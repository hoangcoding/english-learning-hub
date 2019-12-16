import {LOAD_GAME_DATA, LOAD_GAME_DATA_SUCCESS} from "../Game/game.action";

const PREFIX = "DASHBOARD_";

export const LOAD_LESSONS = `${PREFIX}LOAD_LESSONS`;
export const LOAD_LESSONS_SUCCESS = `${PREFIX}LOAD_LESSONS_SUCCESS`;

export const LOAD_WORDS = `${PREFIX}LOAD_WORDS`;
export const LOAD_WORDS_SUCCESS = `${PREFIX}LOAD_WORDS_SUCCESS`;
export const LOAD_ERROR = `${PREFIX}LOAD_ERROR`;


export function loadLessons() {
    return {
        type: LOAD_LESSONS,
    };
}

export function loadLessonsSuccess(payload) {
    return {
        type: LOAD_LESSONS_SUCCESS,
        payload
    };
}

export function loadWords() {
    return {
        type: LOAD_WORDS,
    };
}
export function loadWordsSuccess(payload) {
    return {
        type: LOAD_WORDS_SUCCESS,
        payload
    };
}

export function loadError(payload) {
    return {
        type: LOAD_ERROR,
        payload
    };
}