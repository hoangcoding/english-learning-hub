const PREFIX = "TRANSLATION_";

export const GET_TRANSLATION = `${PREFIX}GET_TRANSLATION`;
export const GET_TRANSLATION_SUCCESS = `${PREFIX}GET_TRANSLATION_SUCCESS`;
export const GET_TRANSLATION_ERROR = `${PREFIX}GET_TRANSLATION_ERROR`;

export function getTranslation(payload) {
    return {
        type: GET_TRANSLATION,
        payload,
    };
}
export function getTranslationSuccess(payload) {
    return {
        type: GET_TRANSLATION_SUCCESS,
        payload,
    };
}
export function getTranslationError(payload) {
    return {
        type: GET_TRANSLATION_ERROR,
        payload,
    };
}