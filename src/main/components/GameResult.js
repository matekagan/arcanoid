import React from 'react';

const GAME_RESULT_LABELS = {
    win: 'VICTORY!',
    defeat: 'DEFEAT !'
};

const GameResult = ({ result, handleButtonClick }) => (
    <div className="menuWrapper">
        <div className="menu">
            <div className="buttonsWrapper">
                <h3>{GAME_RESULT_LABELS[result]}</h3>
            </div>
            <div className="buttonsWrapper">
                <button onClick={handleButtonClick} className="button menuButton">
                    Main Menu
                </button>
            </div>
        </div>
    </div>
);

export default GameResult;
