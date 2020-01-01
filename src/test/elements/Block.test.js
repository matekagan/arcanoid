import Block from '../../main/elements/Block';
import Ball from '../../main/elements/Ball';

const testBlock = new Block({
    width: 40,
    height: 20,
    x: 50,
    y: 50,
    color: 'red'
});

beforeAll(() => {
    testBlock.setContext({
        fillRect: () => {}
    });
});

test('should bounce ball by Y axis from right', () => {
    const initialDy = -7;
    const initialDx = -5;
    const testBall = new Ball({
        x: 95,
        y: 65,
        color: 'blue',
        radius: 7,
        dx: initialDx,
        dy: initialDy
    });
    testBlock.ballCollision(testBall);
    const { dx, dy } = testBall;

    expect(dy).toEqual(initialDy);
    expect(dx).toEqual(-1 * initialDx);
});


test('should bounce ball by Y axis from left', () => {
    const initialDy = -7;
    const initialDx = 5;
    const testBall = new Ball({
        x: 45,
        y: 65,
        color: 'blue',
        radius: 7,
        dx: initialDx,
        dy: initialDy
    });
    testBlock.ballCollision(testBall);
    const { dx, dy } = testBall;

    expect(dy).toEqual(initialDy);
    expect(dx).toEqual(-1 * initialDx);
});

test('should bounce ball by X axis from top', () => {
    const initialDy = 7;
    const initialDx = 5;
    const testBall = new Ball({
        x: 55,
        y: 45,
        color: 'blue',
        radius: 7,
        dx: initialDx,
        dy: initialDy
    });
    testBlock.ballCollision(testBall);
    const { dx, dy } = testBall;

    expect(dy).toEqual(-1 * initialDy);
    expect(dx).toEqual(initialDx);
});


test('should bounce ball by X axis from bottom', () => {
    const initialDy = -7;
    const initialDx = 5;
    const testBall = new Ball({
        x: 55,
        y: 75,
        color: 'blue',
        radius: 7,
        dx: initialDx,
        dy: initialDy
    });
    testBlock.ballCollision(testBall);
    const { dx, dy } = testBall;

    expect(dy).toEqual(-1 * initialDy);
    expect(dx).toEqual(initialDx);
});
