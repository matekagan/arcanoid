class GameElement {
    constructor({ x, y, color }) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw() {
    }

    setContext(context) {
        this.context = context;
    }
}

export default GameElement;

