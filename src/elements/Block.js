import GameElement from './Element';

class Block extends GameElement {
    constructor(params) {
        super(params);
        const { width = 100, height = 20 } = params;
        this.width = width;
        this.height = height;
        this.visible = true;
    }

    draw = () => {
        const oldColor = this.context.fillStyle;
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.fillStyle = oldColor;
    }

    clear = () => {
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    checkColision = (ball) => {
        const { x: ballX, y: ballY, radius } = ball;

        if (ballX <= this.x - radius || ballX >= this.x + this.width + radius) {
            return false;
        }
        if (ballY >= this.y - radius && ballY <= this.y + this.height + radius) {
            this.visible = false;
            return true;
        }

        return false;
    }
}

export default Block;
