import React from 'react';
import Paddle from '../elements/Paddle';
import Ball from '../elements/Ball';
import Block from '../elements/Block';


class Game extends React.Component {
    constructor(props) {
        super(props);
        const { width = 800, height = 500, fps = 30 } = props;
        this.width = width;
        this.height = height;
        this.fps = fps;
        this.board = React.createRef();
        this.state = {
            paddle: new Paddle({ x: (this.width / 2) - 75, y: this.height - 25, color: 'gold', width: 150, height: 15 }),
            blocks: [new Block({ x: 100, y: 100, color: 'green', width: 100, height: 25 })],
            ball: new Ball({ x: (this.width / 2), y: this.height - 25, color: 'red', radius: 7, direction: { dx: 5, dy: -7 } }),
            boardRect: new Block({ x: 0, y: 0, color: 'grey', width, height })
        };
    }

    handleMouseMove = (event) => {
        const { x } = this.calculateNewPosition(event);
        const { paddle } = this.state;
        paddle.setXPosition(x - (paddle.width / 2));
        // this.drawAll();
    }

    calculatePositions = () => {
        const { ball, paddle } = this.state;
        ball.boundsCollision(this.width);
        paddle.checkColision(ball);
        ball.move();
        window.requestAnimationFrame(this.drawAll);
    }

    drawAll = () => {
        const { paddle, ball, blocks, boardRect } = this.state;
        boardRect.draw();
        blocks.forEach(block => block.draw());
        paddle.draw();
        ball.draw();
    }

    calculateNewPosition = ({ clientX, clientY }) => {
        const { left, top } = this.board.current.getBoundingClientRect();
        const { scrollLeft, scrollTop } = document.documentElement;
        const mouseX = clientX - left - scrollLeft;
        const mouseY = clientY - top - scrollTop;
        return {
            x: mouseX,
            y: mouseY
        };
    }

    componentDidMount() {
        const ctx = this.board.current.getContext('2d');
        const { paddle, ball, blocks, boardRect } = this.state;
        boardRect.setContext(ctx);
        paddle.setContext(ctx);
        ball.setContext(ctx);
        blocks.forEach(block => block.setContext(ctx));
        this.interval = setInterval(this.calculatePositions, 1000 / this.fps);
    }

    render() {
        return (
            <div className="gameContainer">
                <canvas
                    className="game"
                    width={this.width}
                    height={this.height}
                    ref={this.board}
                    onMouseMove={this.handleMouseMove}
                />
            </div>
        );
    }
}

export default Game;
