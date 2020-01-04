import React from 'react';
import { DIFFICULTY_LEVELS } from '../utils/gameHelpers';

const Menu = ({ startGame }) => {
    const buttons = Object.values(DIFFICULTY_LEVELS).map(difficulty => (
        <button onClick={() => startGame(difficulty)} className="button menuButton">
            {difficulty}
        </button>
    ));

    return (
        <div className="menu">
            <div className="menuItem">
                <p> Wanna Play a game ?</p>
            </div>
            <div className="menuItem">
                {buttons}
            </div>
        </div>
    );
};

export default Menu;
