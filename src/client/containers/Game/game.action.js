const PREFIX = "GAME_";

export const GO_SINGLE_PLAYER = `${PREFIX}GO_SINGLE_PLAYER`;
export const GO_MULTI_PLAYERS = `${PREFIX}GO_MULTI_PLAYERS`;
export const SET_IS_MULTI_PLAYERS = `${PREFIX}SET_IS_MULTI_PLAYERS`;
export const SET_GAME_STATE = `${PREFIX}SET_GAME_STATE`;
export const SET_CELL_MATCH = `${PREFIX}SET_CELL_MATCH`;
export const SET_CELL_FLIP = `${PREFIX}SET_CELL_FLIP`;
export const CLEAR_CELL_PICKS = `${PREFIX}CLEAR_CELL_PICKS`;
export const INCREASE_MATCH_COUNT = `${PREFIX}INCREASE_MATCH_COUNT`;
export const INCREASE_MATCH_COUNT_SUCCESS = `${PREFIX}INCREASE_MATCH_COUNT_SUCCESS`;
export const SET_GAME_LEVEL = `${PREFIX}SET_GAME_LEVEL`;
export const SET_GAME_LEVEL_SUCCESS = `${PREFIX}SET_GAME_LEVEL_SUCCESS`;
export const GAME_START = `${PREFIX}GAME_START`;
export const GAME_PAUSE = `${PREFIX}GAME_PAUSE`;
export const ROUND_FINISHED = `${PREFIX}ROUND_FINISHED`;
export const DEDUCT_TIME = `${PREFIX}DEDUCT_TIME`;
export const INCREASE_TIMER = `${PREFIX}INCREASE_TIMER`;
export const STOP_TIMER = `${PREFIX}STOP_TIMER`;

export const LOAD_GAME_DATA = `${PREFIX}LOAD_GAME_DATA`;
export const LOAD_GAME_DATA_SUCCESS = `${PREFIX}LOAD_GAME_DATA_SUCCESS`;
export const EXIT = `${PREFIX}EXIT`;
export const GAME_ERROR = `${PREFIX}GAME_ERROR`;
//======================= Multiplayers Events CONSTANTS ========================//

export const SOCKET_CREATE_GAME = `${PREFIX}SOCKET_CREATE_GAME`;
export const SOCKET_CREATE_GAME_SUCCESS = `${PREFIX}SOCKET_CREATE_GAME_SUCCESS`;
export const SOCKET_ENOUGH_PLAYERS = `${PREFIX}SOCKET_ENOUGH_PLAYERS`;

export const SOCKET_JOIN_GAME = `${PREFIX}SOCKET_JOIN_GAME`;
export const SOCKET_JOIN_GAME_SUCCESS = `${PREFIX}SOCKET_JOIN_GAME_SUCCESS`;

export const MULTI_PLAYER_READY = `${PREFIX}MULTI_PLAYER_READY`;
export const OPPONENT_READY = `${PREFIX}OPPONENT_READY`;
export const OPPONENT_INCREASE_MATCH_COUNT = `${PREFIX}OPPONENT_INCREASE_MATCH_COUNT`;
export const OPPONENT_LEVEL_UP = `${PREFIX}OPPONENT_LEVEL_UP`;
export const OPPONENT_FINISH_GAME = `${PREFIX}OPPONENT_FINISH_GAME`;
export const SOCKET_RESUME_GAME = `${PREFIX}SOCKET_RESUME_GAME`;
export const SOCKET_GAME_FINISHED = `${PREFIX}SOCKET_GAME_FINISHED`;
export const SOCKET_PLAYER_WIN = `${PREFIX}SOCKET_PLAYER_WIN`;



export const GAME_STATE = {
    PENDING: 'PENDING',
    WAITING: 'WAITING',
    WAITING_FOR_READY: 'WAITING_FOR_READY',
    MULTI_PLAYER_READY: 'MULTI_PLAYER_READY',
    READY: 'READY',
    IN_PROGRESS: 'IN_PROGRESS',
    MULTI_BOARD: 'MULTI_BOARD',
    PAUSE: 'PAUSE',
    FINISHED: 'FINISHED',
    OVER: 'OVER',
    ERROR: 'ERROR',
};

export function goSinglePlayer() {
    return {
        type: GO_SINGLE_PLAYER,
    };
}
export function clearCellPicks(payload) {
    return {
        type: CLEAR_CELL_PICKS,
        payload,
    };
}
export function goMultiPlayers() {
    return {
        type: GO_MULTI_PLAYERS,
    };
}
export function deductTime(level, sec) {
    return {
        type: DEDUCT_TIME,
        payload: {
            level,
            sec
        },
    };
}
export function increaseTimer() {
    return {
        type: INCREASE_TIMER
    }
}
export function gameStart() {
    return {
        type: GAME_START,
    };
}
export function gamePause() {
    return {
        type: GAME_PAUSE,
    };
}
export function stopTimer() {
    return {
        type: STOP_TIMER,
    };
}
export function roundFinished() {
    return {
        type: ROUND_FINISHED,
    };
}

export function setGameState(payload) {
    return {
        type: SET_GAME_STATE,
        payload,
    };
}
export function increaseMatchCount(level) {
    return {
        type: INCREASE_MATCH_COUNT,
        payload: level,
    };
}
export function increaseMatchCountSuccess(level) {
    return {
        type: INCREASE_MATCH_COUNT_SUCCESS,
        payload: level,
    };
}

export function setCellMatch(level, cid, data) {
    return {
        type: SET_CELL_MATCH,
        payload: {
            level,
            cid,
            data
        },
    };
}
export function setCellFlip(level, cid, data) {
    return {
        type: SET_CELL_FLIP,
        payload: {
            level,
            cid,
            data
        },
    };
}

export function setGameLevel(level) {
    return {
        type: SET_GAME_LEVEL,
        payload: level,
    };
}
export function setGameLevelSuccess(level) {
    return {
        type: SET_GAME_LEVEL_SUCCESS,
        payload: level,
    };
}
export function setIsMultiPlayer(payload) {
    return {
        type: SET_IS_MULTI_PLAYERS,
        payload,
    };
}

export function loadGameData() {
    return {
        type: LOAD_GAME_DATA,
    };
}
export function exit() {
    return {
        type: EXIT,
    };
}

export function loadGameDataSuccess(payload) {
    return {
        type: LOAD_GAME_DATA_SUCCESS,
        payload
    };
}
export function gameError(error) {
    return {
        type: GAME_ERROR,
        payload: error
    }
}
//======================= MultiPlayers Functions ========================//
export function socketCreateGame(code, name) {
    return {
        type: SOCKET_CREATE_GAME,
        payload: {
            code,
            name,
        },
    }
}
export function socketCreateGameSuccess(roomId) {
    return {
        type: SOCKET_CREATE_GAME_SUCCESS,
        payload: roomId,
    }
}
export function socketJoinGame(code, name) {
    return {
        type: SOCKET_JOIN_GAME,
        payload: {
            code,
            name,
        },
    }
}
export function socketEnoughPlayers(payload) {
    return {
        type: SOCKET_ENOUGH_PLAYERS,
        payload,
    }
}
export function socketJoinGameSuccess(roomId) {
    return {
        type: SOCKET_JOIN_GAME_SUCCESS,
        payload: roomId,
    }
}
export function multiPlayerReady(opponentSocketId) {
    return {
        type: MULTI_PLAYER_READY,
        payload: opponentSocketId,
    }
}
export function opponentReady() {
    return {
        type: OPPONENT_READY,
    }
}
export function opponentIncreaseMaxCount() {
    return {
        type: OPPONENT_INCREASE_MATCH_COUNT,
    }
}
export function opponentLevelUp() {
    return {
        type: OPPONENT_LEVEL_UP,
    }
}
export function opponentFinishGame() {
    return {
        type: OPPONENT_FINISH_GAME,
    }
}
export function socketResumeGame() {
    return {
        type: SOCKET_RESUME_GAME,
    }
}
export function socketGameFinished() {
    return {
        type: SOCKET_GAME_FINISHED,
    }
}
export function socketPlayerWin() {
    return {
        type: SOCKET_PLAYER_WIN,
    }
}