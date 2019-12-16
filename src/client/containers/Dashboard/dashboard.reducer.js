import Immutable from "immutable";

import * as ActionType from './dashboard.action';


const initialState = Immutable.fromJS({
    lessons: [],
    words: [],
    isLoading: false,
    error: '',
});

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case ActionType.LOAD_WORDS:
        case ActionType.LOAD_LESSONS:
            return state.set('isLoading', true);
        case ActionType.LOAD_LESSONS_SUCCESS:
            return state.merge({
               lessons: Immutable.fromJS(payload),
                error: '',
                isLoading: false
            });
        case ActionType.LOAD_WORDS_SUCCESS:
            return state.merge({
                words: Immutable.fromJS(payload),
                error: '',
                isLoading: false
            });
        case ActionType.LOAD_ERROR:
            return state.set('error', payload);
        default:
            return state;
    }
}