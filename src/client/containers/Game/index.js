import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import GamePane, {GAMEPANE_CALLBACK_ENUMS} from '../../components/GamePane';
import {
    exit,
    goMultiPlayers,
    goSinglePlayer,
    gameStart,
    gamePause,
    setCellMatch,
    setCellFlip,
    increaseMatchCount,
    clearCellPicks,
    socketCreateGame,
    socketJoinGame,
    multiPlayerReady
} from './game.action';
import GameCell, {GAMECELL_CALLBACK_ENUMS} from "../../components/GameCell";
import {Modal} from "antd";

const {confirm} = Modal;

class Game extends React.Component {
    state = {
        cellPicks: []
    };

    callbackHandler = (type, data) => {
        const {exit} = this.props;
        switch (type) {
            case GAMEPANE_CALLBACK_ENUMS.SINGLE_PLAYER:
                this.props.goSinglePlayer();
                break;
            case GAMEPANE_CALLBACK_ENUMS.MULTI_PLAYERS:
                this.props.goMultiPlayers();
                break;
            case GAMEPANE_CALLBACK_ENUMS.CREATE_MULTI_PLAYERS:
                this.props.socketCreateGame(data.code, this.props.fullName);
                break;
            case GAMEPANE_CALLBACK_ENUMS.JOIN_MULTI_PLAYERS:
                this.props.socketJoinGame(data.code, this.props.fullName);
                break;
            case GAMEPANE_CALLBACK_ENUMS.MULTI_PLAYER_READY:
                this.props.multiPlayerReady(this.props.gameState.getIn(['socketData','opponent','socketId']));
                break;
            case GAMEPANE_CALLBACK_ENUMS.START:
                this.props.gameStart();
                break;
            case GAMEPANE_CALLBACK_ENUMS.PAUSE:
                this.props.gamePause();
                break;
            case GAMEPANE_CALLBACK_ENUMS.BACK:
                this.clearCellPicks();
                exit();
                break;
            case GAMEPANE_CALLBACK_ENUMS.EXIT:
                const context = this;
                confirm({
                    title: 'Do you Want exit this game?',
                    content: 'You will be returned back to main menu',
                    onOk() {
                        context.clearCellPicks();
                        exit();
                    },
                    onCancel() {
                    },
                });
                break;
            case GAMECELL_CALLBACK_ENUMS.FLIP_FRONT:
                if (this.state.cellPicks.length > 0) {
                    const array = [...this.state.cellPicks];
                    const index = array.indexOf(data);
                    if (index !== -1) {
                        array.splice(index, 1);
                        this.setState({cellPicks: array});
                    }
                    const dataId = data.split('-')[0];
                    const word = this.props.gameState.getIn(['gameData', this.props.gameState.get('level'), 'data', `${dataId}-word`, 'isMatch']);
                    const image = this.props.gameState.getIn(['gameData', this.props.gameState.get('level'), 'data', `${dataId}-image`, 'isMatch']);
                    if (!(word === true && image === true)) this.props.setCellFlip(this.props.gameState.get('level'), data, false);
                }
                break;
            case GAMECELL_CALLBACK_ENUMS.FLIP_BACK:
                this.props.setCellFlip(this.props.gameState.get('level'), data, true);
                const id = data.split('-')[0];
                if (this.state.cellPicks.length > 0) {
                    if (id === this.state.cellPicks[0].split('-')[0]) {
                        this.props.setCellMatch(this.props.gameState.get('level'), data, true);
                        this.props.setCellMatch(this.props.gameState.get('level'), this.state.cellPicks[0], true);
                        this.props.increaseMatchCount(this.props.gameState.get('level'));
                        this.clearCellPicks();
                    }
                }
                this.setState(prevState => ({
                    cellPicks: [...prevState.cellPicks, data]
                }));
                break;
            default:
                break;
        }
    };
    clearCellPicks = () => {
        this.setState({cellPicks: []});
    };
    renderCell = (type, data) => {
        if (type === 'word') return <h3 className="text-lg text-center">{data}</h3>;
        return <img src={data} style={{maxHeight: 90}}/>;
    };
    renderBoardCells = () => {
        const data = this.props.gameState.getIn(['gameData', this.props.gameState.get('level'), 'data']);
        if (data) {
            return data.entrySeq().map(e => (<GameCell key={e[0]} cid={e[0]} callbackHandler={this.callbackHandler}
                                                       cellPicks={this.state.cellPicks}
                                                       gameState={this.props.gameState.get('gameState')}
                                                       isFlipped={this.props.gameState.getIn(['gameData', this.props.gameState.get('level'), 'data', e[0], 'isFlipped'])}
                                                       isMatch={this.props.gameState.getIn(['gameData', this.props.gameState.get('level'), 'data', e[0], 'isMatch'])}>
                {this.renderCell(e[1].get('type'), e[1].get('data'))}
            </GameCell>));
        }
        return <></>;
    };

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.gameState.get('needClearCellPicks')) {
            this.clearCellPicks();
            this.props.clearCellPicks(false);
        }
    }

    componentWillUnmount() {

    }

    render() {
        const {gameState} = this.props;
        return <GamePane gameState={gameState.get('gameState')}
                         callbackHandler={this.callbackHandler}
                         error={gameState.get('error')}
                         currentLevel={gameState.get('level')}
                         isMultiPlayer={gameState.get('isMultiPlayer')}
                         isLoading={gameState.get('isLoading')}
                         renderBoardCells={this.renderBoardCells}
                         roomNumber={gameState.getIn(['socketData', 'roomId'])}
                         opponent={gameState.getIn(['socketData','opponent'])}
                         timer={this.props.gameState.get('timer')}
                         timeLeft={this.props.gameState.getIn(['gameData', this.props.gameState.get('level'), 'timeLeft'])}
        />;
    }
}

const mapStateToProps = state => ({
    gameState: state.game,
    fullName: `${state.authentication.login.getIn(['userInfo', 'firstName'])} ${state.authentication.login.getIn(['userInfo', 'lastName'])}`
});

const mapDispatchToProps = {
    goMultiPlayers,
    goSinglePlayer,
    exit,
    gameStart,
    gamePause,
    setCellMatch,
    setCellFlip,
    increaseMatchCount,
    clearCellPicks,
    socketCreateGame,
    socketJoinGame,
    multiPlayerReady
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Game)
);
