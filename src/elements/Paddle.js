import GameElement from './Element';

const ANGLE_RATIO = 2;

class Paddle extends GameElement {
    constructor(params) {
        super(params);
        const { width = 100, height = 20 } = params;
        this.width = width;
        this.height = height;
    }

    draw() {
        const oldColor = this.context.fillStyle;
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.fillStyle = oldColor;
    }

    checkColision(ball) {
        const { direction: { dy, dx }, x: ballX, y: ballY, radius } = ball;
        if (dy <= 0) {
            return;
        }
        if (this.x - radius > ballX || this.x + this.width + radius < ballX) {
            return;
        }
        if (this.y <= ballY && this.y + this.height >= ballY) {
            const deltaX = ballX - this.x - (this.width / 2);
            const totalSpeed = Math.abs(dx) + Math.abs(dy);
            const newDx = (deltaX / this.width) * (totalSpeed * ANGLE_RATIO);
            ball.changeDirection(newDx, -dy);
        }
    }

    setXPosition(x) {
        this.x = x;
    }

    setWidth(width) {
        this.width = width;
    }
}

export default Paddle;
