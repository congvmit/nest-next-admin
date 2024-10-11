const getRandomNumber = (
    min: number,
    max: number,
    random: () => number = Math.random
): number => {
    return Math.floor(random() * (max - min + 1)) + min;
}

const result = getRandomNumber(1, 10);
console.log(result);