import Immutable from 'immutable';
import * as ActionType from './lessons.action';

const initialState = Immutable.fromJS({
    lessons: {},
    isLoading: false,
    progress: {}
});

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionType.LOAD_LESSONS:
            return state.set('isLoading', true);
        case ActionType.LOAD_LESSONS_SUCCESS:
            return state.merge({
                lessons: payload,
                isLoading: false,
            });
        case ActionType.SET_PROGRESS_SUCCESS: 
            return state.set('progress', payload);
        default:
            return state;
     }
  };

  export default reducer;