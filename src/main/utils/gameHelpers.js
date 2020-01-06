
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
        ballYSpeed: 4,
        blockRows: 5
    },
    medium: {
        paddleWidth: 0.12,
        ballYSpeed: 6,
        blockRows: 6
    },
    hard: {
        paddleWidth: 0.1,
        ballYSpeed: 8,
        blockRows: 7
    }
};
