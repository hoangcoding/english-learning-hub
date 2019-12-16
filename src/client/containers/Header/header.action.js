const PREFIX = "HEADER_";

export const LOAD_TOPICS = `${PREFIX}LOAD_TOPICS`;
export const LOAD_TOPICS_SUCCESS = `${PREFIX}LOAD_TOPICS_SUCCESS`;
export const LOAD_TOPICS_ERROR = `${PREFIX}LOAD_TOPICS_ERROR`;

export const loadTopics = () => {
    return {
        type: LOAD_TOPICS,
    }
}
export function loadTopicsSuccess(payload) {
    return {
        type: LOAD_TOPICS_SUCCESS,
        payload,
    };
}
export function loadTopicsError(payload) {
    return {
        type: LOAD_TOPICS_ERROR,
        payload,
    };
}