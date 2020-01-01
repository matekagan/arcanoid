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

    ballCollision(ball) {
        const { x: ballX, y: ballY, radius, dx, dy } = ball;
        const left = this.x - radius;
        const right = this.x + this.width + radius;
        const top = this.y - radius;
        const bottom = this.y + this.height + radius;

        if (ballX < left || ballX > right || ballY < top || ballY > bottom) {
            return;
        }
        this.visible = false;
        this.clear();
        const prevBallX = ballX - dx;
        const prevBallY = ballY - dy;

        if ((prevBallX < left || prevBallX > right) && prevBallY > top && prevBallY < bottom) {
            ball.changeDirection(-dx, dy);
        }

        if ((prevBallY < top || prevBallY > bottom) && prevBallX > left && prevBallX < right) {
            ball.changeDirection(dx, -dy);
        }
    }
}

export default Block;
