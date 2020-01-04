
export const GAME_STATUS = {
    IN_PROGRESS: 'inProgress',
    DEFEAT: 'defeat',
    WIN: 'win',
    MENU: 'menu'
};


export const DIFFICULTY_LEVELS = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
};


export const DIFFICULTY_VALUES = {
    easy: {
        paddleWidth: 0.15,
        ballYSpeed: 4
    },
    medium: {
        paddleWidth: 0.11,
        ballYSpeed: 6
    },
    hard: {
        paddleWidth: 0.08,
        ballYSpeed: 8
    }
};
