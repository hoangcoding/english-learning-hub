const PREFIX = "LESSONS_";

export const LOAD_LESSONS = `${PREFIX}LOAD_LESSONS`;
export const LOAD_LESSONS_SUCCESS = `${PREFIX}LOAD_LESSONS_SUCCESS`;
export const LOAD_LESSONS_ERROR = `${PREFIX}LOAD_LESSONS_ERROR`;

export const SET_PROGRESS = `${PREFIX}SET_PROGRESS`;
export const SET_PROGRESS_SUCCESS = `${PREFIX}SET_PROGRESS_SUCCESS`;
export const SET_PROGRESS_ERROR = `${PREFIX}SET_PROGRESS_ERROR`;

export function loadLessons(payload) {
    return {
        type: LOAD_LESSONS,
        payload,
    };
}
export function loadLessonsSuccess(payload) {
    return {
        type: LOAD_LESSONS_SUCCESS,
        payload,
    };
}
export function loadLessonsError(payload) {
    return {
        type: LOAD_LESSONS_ERROR,
        payload,
    };
}

export function setProgress(word, topic) {
    return {
        type: SET_PROGRESS,
        payload : {word, topic},
    };
}
export function setProgressSuccess(payload) {
    return {
        type: SET_PROGRESS_SUCCESS,
        payload,
    };
}
export function setProgressError(payload) {
    return {
        type: SET_PROGRESS_ERROR,
        payload,
    };
}