import Block from '../elements/Block';

const BLOCK_ROW_WIDTH_RATIO = 0.8;
const NUMBER_OF_BLOCKS_IN_ROW = 12;
const BLOCK_HEIGHT = 20;
const DEFAULT_NUMBER_OF_ROWS = 6;
const BLOCK_TOP_Y_OFFSET_RATIO = 0.1;
const BLOCK_SPACING = 2;

export const prepareBlocks = (width, height, numberOfRows = DEFAULT_NUMBER_OF_ROWS) => {
    const yOffset = Math.floor(height * BLOCK_TOP_Y_OFFSET_RATIO);
    const blocks = [];
    for (let i = 0; i < numberOfRows; i += 1) {
        const rowYpos = yOffset + i * (BLOCK_HEIGHT + BLOCK_SPACING);
        blocks.push(...prepareBlockRow(width, rowYpos, 'green'));
    }
    return blocks;
};

const prepareBlockRow = (width, rowYpos, color) => {
    const blockRowWidth = Math.floor(width * BLOCK_ROW_WIDTH_RATIO);
    const blockWidth = Math.floor(blockRowWidth / NUMBER_OF_BLOCKS_IN_ROW) - BLOCK_SPACING;
    const startingX = Math.floor((width - blockRowWidth) / 2);
    const blocks = [];
    for (let i = 0; i < NUMBER_OF_BLOCKS_IN_ROW; i += 1) {
        blocks.push(new Block({
            width: blockWidth,
            height: BLOCK_HEIGHT,
            x: startingX + (i * (blockWidth + BLOCK_SPACING)),
            y: rowYpos,
            color
        }));
    }
    return blocks;
};
