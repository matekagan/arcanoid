import GameElement from './Element';

class Ball extends GameElement {
    constructor(params) {
        super(params);
        const { radius = 10, dx = 0, dy = 0 } = params;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }

    draw = () => {
        const oldColor = this.context.fillStyle;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.fillStyle = oldColor;
    }

    clear = () => {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius + 1, 0, 2 * Math.PI, false);
        this.context.fill();
    }

    boundsCollision = (maxX) => {
        const left = this.radius;
        const right = maxX - this.radius;
        const top = this.radius;

        if ((this.x < left && this.dx < 0) || (this.x > right && this.dx > 0)) {
            this.dx *= -1;
        }

        if (this.y < top) {
            this.dy *= -1;
        }
    }

    shouldFail = (maxY) => {
        const bottom = maxY - this.radius;
        if (this.y > bottom) {
            return true;
        }
        return false;
    }

    changeDirection = (dx, dy) => {
        this.dx = dx;
        this.dy = dy;
    }

    move = () => {
        this.x += this.dx;
        this.y += this.dy;
    }
}

export default Ball;
