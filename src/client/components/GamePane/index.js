import React from "react";
import {GAME_STATE} from "../../containers/Game/game.action";
import {Button, Modal, Skeleton} from 'antd';
import {GAME_LEVEL} from "../../config/constants";
import GameBoard from "../GameBoard";
import CreateNewGame from '../../components/CreateNewGame';
import JoinAGame from '../../components/JoinAGame';
import OpponentCard from '../../components/OpponentCard';
const VIEW_CALLBACK_ENUMS = {
    START: 'START',
    PAUSE: 'PAUSE',
    SINGLE_PLAYER: 'SINGLE_PLAYER',
    MULTI_PLAYERS: 'MULTI_PLAYERS',
    CREATE_MULTI_PLAYERS: 'CREATE_MULTI_PLAYERS',
    JOIN_MULTI_PLAYERS: 'JOIN_MULTI_PLAYERS',
    MULTI_PLAYER_READY: 'MULTI_PLAYER_READY',
    EXIT: 'EXIT',
    BACK: 'BACK',
};

const BackButton = (props) => (
    <Button type="danger" shape="round" icon="close" size="large"
            className="mx-auto block mt-5" onClick={props.handleBack} loading={props.isLoading}>
        Exit
    </Button>
);

class GamePane extends React.Component {

    handleSinglePlayer = () => this.props.callbackHandler(VIEW_CALLBACK_ENUMS.SINGLE_PLAYER, undefined);
    handleMultiPlayers = () => this.props.callbackHandler(VIEW_CALLBACK_ENUMS.MULTI_PLAYERS, undefined);
    handleExit = () => this.props.callbackHandler(VIEW_CALLBACK_ENUMS.EXIT, undefined);
    handleBack = () => this.props.callbackHandler(VIEW_CALLBACK_ENUMS.BACK, undefined);
    handleStartGame = () => this.props.callbackHandler(VIEW_CALLBACK_ENUMS.START, undefined);
    handlePauseGame = () => this.props.callbackHandler(VIEW_CALLBACK_ENUMS.PAUSE, undefined);
    handleCreateNewGame = (values) => this.props.callbackHandler(VIEW_CALLBACK_ENUMS.CREATE_MULTI_PLAYERS, values);
    handleJoinAGame = (values) => this.props.callbackHandler(VIEW_CALLBACK_ENUMS.JOIN_MULTI_PLAYERS, values);
    handleMultiPlayerReady = () => this.props.callbackHandler(VIEW_CALLBACK_ENUMS.MULTI_PLAYER_READY, undefined);

    renderGameState = (state) => {
        switch (state) {
            case GAME_STATE.PENDING:
                return (
                    <>
                        <h1 className="text-3xl mb-5 text-center">Welcome to our Game Center</h1>
                        <div className="flex flex-wrap bg-gray-400 p-8 lg:rounded-lg">
                            <div className="w-full lg:w-1/2 h-auto mb-5 lg:mb-0">
                                <Button type="default" shape="round" icon="user" size="large"
                                        className="mx-auto block mb-5" onClick={this.handleSinglePlayer}>
                                    Practice
                                </Button>
                                <p className="text-center">Practice your English skills</p>
                            </div>
                            <div className="w-full lg:w-1/2 h-auto">
                                <Button type="default" shape="round" icon="team" size="large"
                                        className="mx-auto block mb-5" onClick={this.handleMultiPlayers}>
                                    Challenge
                                </Button>
                                <p className="text-center">Challenge your friends, who finish first win!</p>
                            </div>
                        </div>
                    </>
                );
            case GAME_STATE.MULTI_BOARD:
                return <>
                    <h1 className="text-3xl mb-5 text-center">Please select either create a new game or join a game</h1>
                    <div className="flex mb-4 flex-wrap mb-5">
                        <div className="w-full lg:w-1/2 p-4">
                            <div className="border-dotted border-4 border-gray-600 p-3">
                                <CreateNewGame handleSubmit={this.handleCreateNewGame}
                                               isLoading={this.props.isLoading}/>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 p-4">
                            <div className="border-dotted border-4 border-gray-600 p-3">
                                <JoinAGame handleSubmit={this.handleJoinAGame} isLoading={this.props.isLoading}/>
                            </div>
                        </div>
                    </div>
                    <BackButton handleBack={this.handleBack} isLoading={this.props.isLoading}/>
                </>;
            case GAME_STATE.WAITING:
                return <>
                    <h1 className="text-3xl mb-5 text-center">Room #: {this.props.roomNumber}</h1>
                    <h1 className="text-3xl mb-5 text-center">Waiting for another player to join the game ...</h1>
                    <BackButton handleBack={this.handleBack} isLoading={this.props.isLoading}/>
                </>;
            case GAME_STATE.ERROR:
                return (
                    <>
                        <div className="bg-gray-400 p-8 lg:rounded-lg">
                            <h1 className="text-xl text-center text-orange-500">{this.props.error}</h1>
                            <h1 className="text-xl text-center text-orange-500">Please restart the game!</h1>
                        </div>
                        <BackButton handleBack={this.handleBack} isLoading={this.props.isLoading}/>
                    </>
                );
            case GAME_STATE.WAITING_FOR_READY:
            case GAME_STATE.MULTI_PLAYER_READY:
            case GAME_STATE.READY:
            case GAME_STATE.IN_PROGRESS:
            case GAME_STATE.PAUSE:
            case GAME_STATE.FINISHED:
            case GAME_STATE.OVER:
                return (<>
                    {this.renderMultiPlayer()}
                    <GameBoard currentLevel={this.props.currentLevel}
                               timeLeft={this.props.timeLeft}
                               timer={this.props.timer}
                               handleExit={this.handleExit}
                               handleStartGame={this.handleStartGame}
                               handleBack={this.handleBack}
                               handleMultiPlayerReady={this.handleMultiPlayerReady}
                               isLoading={this.props.isLoading}
                               isMultiPlayer={this.props.isMultiPlayer}
                               handlePauseGame={this.handlePauseGame}
                               gameState={state}>{this.props.renderBoardCells()}</GameBoard>
                </>);
            default:
                return <></>;
        }
    };
    convertMatchCountToPercent = (matchCount, currentLevel) => {
        return (matchCount / GAME_LEVEL[currentLevel].amount * 100).toFixed(2);
    };
    renderMultiPlayer = () => {
        const {isMultiPlayer, opponent} = this.props;
        if (!isMultiPlayer) return <></>;
        else {
            return (
                <div className="w-full p-4">
                    <div className="border-dotted border-4 border-gray-600 p-3">
                        <OpponentCard
                            name={opponent.get('name')}
                            currentLevel={opponent.get('currentLevel')}
                            matchCount={this.convertMatchCountToPercent(opponent.get('matchCount'), opponent.get('currentLevel'))}
                            status={opponent.get('status')}
                        />
                    </div>
                </div>
            );
        }
    };

    render() {
        const {gameState, isLoading} = this.props;
        return <Skeleton loading={isLoading}>
            <div className="mt-4">{this.renderGameState(gameState)}</div>
        </Skeleton>;
    }
}

export default GamePane;

export {
    VIEW_CALLBACK_ENUMS as GAMEPANE_CALLBACK_ENUMS,
};
