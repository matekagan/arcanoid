import React from 'react';
import Paddle from '../elements/Paddle';
import Ball from '../elements/Ball';
import Block from '../elements/Block';
import * as BoardHelper from '../utils/boardHelper';

const BOARD_COLOR = '#404040';
const PADDLE_COLOR = '#DDDDDD';
const BALL_COLOR = '#FF0000';

class Game extends React.Component {
    constructor(props) {
        super(props);
        const { width = 800, height = 500, fps = 30 } = props;
        this.width = width;
        this.height = height;
        this.fps = fps;
        this.board = React.createRef();
        this.state = {
            paddle: new Paddle({ x: (this.width / 2) - 75, y: this.height - 25, color: PADDLE_COLOR, width: 150, height: 15 }),
            blocks: BoardHelper.prepareBlocks(width, height),
            ball: new Ball({ x: (this.width / 2), y: this.height - 25, color: BALL_COLOR, radius: 7, dx: 0, dy: -7 }),
            boardRect: new Block({ x: 0, y: 0, color: BOARD_COLOR, width, height })
        };
    }

    handleMouseMove = (event) => {
        const { x } = this.calculateNewPosition(event);
        const { paddle } = this.state;
        paddle.setXPosition(x - (paddle.width / 2));
    }

    calculatePositions = () => {
        const { ball, paddle, blocks } = this.state;
        const visibleBlocks = blocks.filter(block => block.visible);
        if (ball.shouldFail(this.height) || visibleBlocks.length === 0) {
            this.props.finishGame();
        }
        ball.boundsCollision(this.width);
        paddle.ballCollision(ball);
        blocks.forEach(block => block.visible && block.ballCollision(ball));
        ball.clear();
        paddle.clear(this.width);
        ball.move();
        window.requestAnimationFrame(this.drawAll);
    }

    drawAll = () => {
        const { paddle, ball } = this.state;
        ball.draw();
        paddle.draw();
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
        ctx.fillStyle = BOARD_COLOR;
        boardRect.setContext(ctx);
        paddle.setContext(ctx);
        ball.setContext(ctx);
        blocks.forEach(block => block.setContext(ctx));
        boardRect.draw();
        blocks.forEach(block => block.draw());
        this.interval = setInterval(this.calculatePositions, 1000 / this.fps);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="centeredContainer">
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
