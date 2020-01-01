import React from 'react';


const Menu = ({ startGame }) => (
    <div className="menu">
        <div className="menuItem">
            <p> Wanna Play a game ?</p>
        </div>
        <div className="menuItem">
            <button onClick={startGame} className="button menuButton">
                Yes
            </button>
        </div>
    </div>
);

export default Menu;
