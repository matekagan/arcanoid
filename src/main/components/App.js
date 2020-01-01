import React, { useState } from 'react';
import Game from './Game';
import Menu from './Menu';

export default () => {
    const [isGameOn, setGameState] = useState(false);

    return (
        <div className="app">
            {
                isGameOn
                    ? (<Game finishGame={() => setGameState(false)} />)
                    : (<Menu startGame={() => setGameState(true)} />)
            }
        </div>
    );
};
