import React from 'react';
import Paddle from '../elements/Paddle';
import Ball from '../elements/Ball';
import Block from '../elements/Block';
import * as BoardHelper from '../utils/boardHelper';
import { GAME_STATUS, DIFFICULTY_VALUES, DIFFICULTY_LEVELS } from '../utils/gameHelpers';

const BOARD_COLOR = '#404040';
const PADDLE_COLOR = '#DDDDDD';
const BALL_COLOR = '#FF0000';
const SCALE_FACTOR = 2;

class Game extends React.Component {
    constructor(props) {
        super(props);
        const { width = 800, height = 500, fps = 60, difficulty = DIFFICULTY_LEVELS.MEDIUM } = props;
        const { paddleWidth, ballYSpeed } = DIFFICULTY_VALUES[difficulty];
        this.width = width;
        this.height = height;
        this.fps = fps;
        this.board = React.createRef();
        this.state = {
            paddle: new Paddle({
                x: (this.width / 2) - 75,
                y: this.height - 25,
                color: PADDLE_COLOR,
                width: Math.round(paddleWidth * width),
                height: 15
            }),
            blocks: BoardHelper.prepareBlocks(this.width, this.height),
            ball: new Ball({
                x: (this.width / 2),
                y: this.height - 25,
                color: BALL_COLOR,
                radius: 7,
                dx: 0,
                dy: -ballYSpeed
            }),
            boardRect: new Block({
                x: 0,
                y: 0,
                color: BOARD_COLOR,
                width: this.width,
                height: this.height
            })
        };
    }

    handleMouseMove = (event) => {
        const { x } = this.calculateNewPosition(event);
        const { paddle } = this.state;
        paddle.setXPosition(x - (paddle.width / 2));
    }

    calculatePositions = () => {
        const { ball, paddle, blocks } = this.state;
        if (ball.shouldFail(this.height)) {
            this.props.finishGame(GAME_STATUS.DEFEAT);
        }
        if (blocks.length === 0) {
            this.props.finishGame(GAME_STATUS.WIN);
        }
        ball.boundsCollision(this.width);
        paddle.ballCollision(ball);
        blocks.forEach(block => block.visible && block.ballCollision(ball));
        ball.clear();
        paddle.clear(this.width);
        ball.move();
        window.requestAnimationFrame(this.drawAll);
        this.setState({ blocks: blocks.filter(block => block.visible) });
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
        ctx.scale(SCALE_FACTOR, SCALE_FACTOR);
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
                    style={{ width: `${this.width}px`, height: `${this.height}px` }}
                    width={this.width * SCALE_FACTOR}
                    height={this.height * SCALE_FACTOR}
                    ref={this.board}
                    onMouseMove={this.handleMouseMove}
                />
            </div>
        );
    }
}

export default Game;
