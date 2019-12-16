import React from "react";
import ReactCardFlip from 'react-card-flip';
import {GAME_STATE} from "../../containers/Game/game.action";
import './index.scss';
import requiresTimeOut from "../../hocs/requiresTimeOut";

const VIEW_CALLBACK_ENUMS = {
    FLIP_FRONT: 'FLIP_FRONT',
    FLIP_BACK: 'FLIP_BACK',
};

class GameCell extends React.Component {
    state = {
        width: 100,
        height: 100,
        loading: true,
        isFlipping: false,
    };

    constructor(props) {
        super(props);
    }

    handleCardClick = () => {
        if (!this.state.isFlipping && this.props.cellPicks.length < 2 && this.props.isMatch === false && this.props.gameState === GAME_STATE.IN_PROGRESS) {
            this.setState({isFlipping: true});
            this.props.callbackHandler(VIEW_CALLBACK_ENUMS.FLIP_BACK, this.props.cid);
            this.props.setTimeout(() => {
                this.setState({isFlipping: false});
                this.props.callbackHandler(VIEW_CALLBACK_ENUMS.FLIP_FRONT, this.props.cid);
            }, 1500);
        }
    };

    render() {
        return (
            <>
                <div style={{width: this.state.width, height: this.state.height}}>
                    <ReactCardFlip isFlipped={this.props.isFlipped} flipDirection="horizontal">
                        <div style={{width: this.state.width, height: this.state.height}}
                             className="cursor-pointer shadow p-1 select-none flex justify-center items-center"
                             onClick={this.handleCardClick} key="front">
                            <div className="cover w-full h-full"/>
                        </div>
                        <div style={{width: this.state.width, height: this.state.height}}
                             className="cursor-pointer shadow p-1 select-none"
                             onClick={this.handleCardClick} key="back">
                            <div
                                className="w-full h-full bg-white flex justify-center items-center border-double rounded">{this.props.children}</div>
                        </div>
                    </ReactCardFlip>
                </div>
            </>
        )
    }
}

export default requiresTimeOut(GameCell);


export {
    VIEW_CALLBACK_ENUMS as GAMECELL_CALLBACK_ENUMS,
};
