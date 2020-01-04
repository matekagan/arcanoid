import React from 'react';

const GAME_RESULT_LABELS = {
    win: 'Congratulations',
    defeat: 'See ya looser'
};

const GameResult = ({ result, handleButtonClick }) => (
    <div>
        {GAME_RESULT_LABELS[result]}
        <button onClick={handleButtonClick} className="button menuButton">
            Go back to Main menu
        </button>
    </div>
);

export default GameResult;
