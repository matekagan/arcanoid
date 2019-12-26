import GameElement from './Element';

class Ball extends GameElement {
    constructor(params) {
        super(params);
        const { radius = 10, direction = { dx: 0, dy: 0 } } = params;
        this.radius = radius;
        this.direction = direction;
    }

    draw = () => {
        const oldColor = this.context.fillStyle;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.color;
        // this.context.closePath();
        this.context.fill();
        this.context.fillStyle = oldColor;
    }

    boundsCollision = (maxX) => {
        if (this.x - this.radius <= maxX && this.x + this.radius >= maxX && this.direction.dx > 0) {
            this.direction.dx *= -1;
        }
        if (this.y - this.radius <= 0 && this.y + this.radius >= 0 && this.direction.dy < 0) {
            this.direction.dy *= -1;
        }
        if (this.x - this.radius <= 0 && this.x + this.radius >= 0 && this.direction.dx < 0) {
            this.direction.dx *= -1;
        }
    }

    shouldFail = (maxY) => {
        if (this.y - this.radius <= maxY && this.y + this.radius >= maxY && this.direction.dy > 0) {
            return true;
        }
        return false;
    }

    changeDirection = (dx, dy) => {
        this.direction = { dx, dy };
    }

    move = () => {
        this.x += this.direction.dx;
        this.y += this.direction.dy;
    }
}

export default Ball;
