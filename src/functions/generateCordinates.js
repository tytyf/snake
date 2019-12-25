const generateCordinates = () => {
    const snakeLength = 25;

    const maxTop = 600;
    const maxLeft = 600;

    const topMultiplier = maxTop/snakeLength;
    const leftMultiplier = maxLeft/snakeLength;

    const randomTop = Math.floor(Math.random() * topMultiplier) * snakeLength;
    const randomLeft = Math.floor(Math.random() * leftMultiplier) * snakeLength;

    return { position: 'absolute', top: randomTop, left: randomLeft };
};

export default generateCordinates;