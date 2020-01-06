import React from 'react';
import { DIFFICULTY_LEVELS } from '../utils/gameHelpers';

const Menu = ({ startGame }) => {
    const buttons = Object.values(DIFFICULTY_LEVELS).map(difficulty => (
        <div className="buttonsWrapper">
            <button onClick={() => startGame(difficulty)} className="button menuButton">
                {difficulty}
            </button>
        </div>
    ));

    return (
        <div className="menuWrapper">
            <div className="menu">
                <div className="menuItem">
                    <h3> Choose game dificulty</h3>
                </div>
                <div className="menuItem">
                    {buttons}
                </div>
            </div>
        </div>
    );
};

export default Menu;
