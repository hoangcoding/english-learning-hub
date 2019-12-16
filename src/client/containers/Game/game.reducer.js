import Immutable from "immutable";
import * as ActionType from './game.action';

const initialState = Immutable.fromJS({
    gameState: ActionType.GAME_STATE.PENDING,
    gameData: [],
    error: '',
    level: 0,
    timeLimit: 0,
    timer: 0,
    isLoading: false,
    isMultiPlayer: false,
    needClearCellPicks: false,
    socketData: {
        roomId: '',
        opponent: {},
    }
});

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case ActionType.LOAD_GAME_DATA:
            return state.set('isLoading', 'true');
        case ActionType.LOAD_GAME_DATA_SUCCESS:
            return state.mergeDeep({
                isLoading: false,
                gameData: Immutable.fromJS(payload),
                timeLimit: payload[0].timeLeft,
            });
        case ActionType.SET_GAME_STATE:
            return state.set('gameState', payload);
        case ActionType.GO_MULTI_PLAYERS:
            return state.merge({
                isMultiPlayer: true,
                gameState: ActionType.GAME_STATE.MULTI_BOARD,
            });
        case ActionType.SET_GAME_LEVEL_SUCCESS:
            return state.set('level', payload);
        case ActionType.DEDUCT_TIME:
            return state.setIn(['gameData', payload.level, 'timeLeft'], state.getIn(['gameData', payload.level, 'timeLeft']) - payload.sec);
        case ActionType.INCREASE_MATCH_COUNT_SUCCESS:
            return state.setIn(['gameData', payload, 'totalMatches'], state.getIn(['gameData', payload, 'totalMatches']) + 1);
        case ActionType.SET_CELL_MATCH:
            return state.setIn(['gameData', payload.level, 'data', payload.cid, 'isMatch'], payload.data);
        case ActionType.SET_CELL_FLIP:
            return state.setIn(['gameData', payload.level, 'data', payload.cid, 'isFlipped'], payload.data);
        case ActionType.CLEAR_CELL_PICKS:
            return state.set('needClearCellPicks', payload);
        case ActionType.SOCKET_CREATE_GAME:
        case ActionType.SOCKET_JOIN_GAME:
            return state.set('isLoading', true);
        case ActionType.SOCKET_CREATE_GAME_SUCCESS:
        case ActionType.SOCKET_JOIN_GAME_SUCCESS:
            return state.setIn(['socketData', 'roomId'], payload).merge({
                gameState: ActionType.GAME_STATE.WAITING,
                isLoading: false
            });
        case ActionType.SOCKET_ENOUGH_PLAYERS:
            return state.mergeDeep({
                gameState: ActionType.GAME_STATE.WAITING_FOR_READY,
                socketData: {
                    opponent: {
                        currentLevel: payload.currentLevel,
                        finished: payload.finished,
                        matchCount: payload.matchCount,
                        name: payload.name,
                        readyToPlay: payload.readyToPlay,
                        socketId: payload.socketId,
                    }
                }
            });
        case ActionType.OPPONENT_READY:
            return state.setIn(['socketData', 'opponent', 'readyToPlay'], true);
        case ActionType.MULTI_PLAYER_READY:
            return state.set('gameState', ActionType.GAME_STATE.MULTI_PLAYER_READY);
        case ActionType.INCREASE_TIMER:
            return state.update('timer', val => val + 1);
        case ActionType.OPPONENT_INCREASE_MATCH_COUNT:
            return state.updateIn(['socketData', 'opponent', 'matchCount'], count => count + 1);
        case ActionType.OPPONENT_LEVEL_UP:
            return state.updateIn(['socketData', 'opponent', 'currentLevel'], level => level + 1).setIn(['socketData', 'opponent', 'matchCount'], 0);
        case ActionType.SOCKET_GAME_FINISHED:
            return state.setIn(['socketData', 'opponent', 'status'], 'Opponent LOOSE!');
        case ActionType.OPPONENT_FINISH_GAME:
            return state.setIn(['socketData', 'opponent', 'status'], 'Opponent WIN!');
        case ActionType.SOCKET_PLAYER_WIN:
            return state.setIn(['socketData', 'opponent', 'status'], 'Opponent LEFT!');
        case ActionType.GAME_ERROR:
            return state.merge({
                isLoading: false,
                error: payload,
                gameState: ActionType.GAME_STATE.ERROR,
            });
        case ActionType.EXIT:
            return initialState;
        default:
            return state;
    }
}