import Immutable from 'immutable';
import * as ActionType from './translation.action';

const initialState = Immutable.fromJS({
    isLoading: false,
    translation: {}
});

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionType.GET_TRANSLATION:
            return state.set('isLoading', true);
        case ActionType.GET_TRANSLATION_SUCCESS:
            return state.merge({
                translation: payload,
                isLoading: false,
            });
        default:
            return state;
     }
  };

  export default reducer;