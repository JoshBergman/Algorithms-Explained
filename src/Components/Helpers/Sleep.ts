export const sleep = (timeInMS: number | undefined) => {
    let useNum = timeInMS;
    if(timeInMS === undefined) {
        useNum = 5;
    }
    if(timeInMS === 0) {
        useNum = 0.01;
    }
    return new Promise(resolve => setTimeout(resolve, useNum));
};