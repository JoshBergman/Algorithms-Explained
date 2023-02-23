export const getRandomArray = () => {
    const returnArray = [];
    for(let i = 0; i < 100; i++){
        returnArray.push(Math.floor(Math.random() * 100) + 1);
    }

    return returnArray;
};