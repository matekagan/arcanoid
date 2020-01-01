class GameElement {
    constructor({ x, y, color }) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw = () => {
    }

    clear = () => {
    }

    setContext = (context) => {
        this.context = context;
    }
}

export default GameElement;

