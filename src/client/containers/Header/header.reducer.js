import Immutable from 'immutable';
import * as ActionType from './header.action';

const initialState = Immutable.fromJS({
    isLoading: false,
    topics: [],
});

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionType.LOAD_TOPICS:
            return state.set('isLoading', true);
        case ActionType.LOAD_TOPICS_SUCCESS:
            return state.merge({
                isLoading: false,
                topics: payload
            })
        default:
            return state;
     }
  };

  export default reducer;