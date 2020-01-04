import React from 'react';
import Game from './Game';
import Menu from './Menu';
import GameResult from './GameResult';
import { GAME_STATUS, DIFFICULTY_LEVELS } from '../utils/gameHelpers';

class Arcanoid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameStatus: GAME_STATUS.MENU,
            gameDifficulty: DIFFICULTY_LEVELS.MEDIUM
        };
        this.statusMapping = this.createStatusMapping();
    }

    handleGameStateChange(gameStatus) {
        this.setState({ gameStatus });
    }

    handleGameStart(gameDifficulty) {
        this.setState({
            gameStatus: GAME_STATUS.IN_PROGRESS,
            gameDifficulty
        });
    }


    createStatusMapping() {
        const inProgress = ({ gameDifficulty }) => (
            <Game
                width={1280}
                height={720}
                difficulty={gameDifficulty}
                finishGame={newState => this.handleGameStateChange(newState)}
            />
        );
        const menu = () => <Menu startGame={difficulty => this.handleGameStart(difficulty)} />;
        const gameFinished = result => (
            <GameResult
                result={result}
                handleButtonClick={() => this.handleGameStateChange(GAME_STATUS.MENU)}
            />
        );

        return {
            menu,
            inProgress,
            win: () => gameFinished(GAME_STATUS.WIN),
            defeat: () => gameFinished(GAME_STATUS.DEFEAT)
        }
    }


    render() {
        const { gameStatus } = this.state;
        return (
            <div className="app">
                {this.statusMapping[gameStatus](this.state)}
            </div>
        );
    }
}

export default Arcanoid;
