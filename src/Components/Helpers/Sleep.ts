export const sleep = (timeInMS: number | undefined) => {
    let useNum = timeInMS;
    if(timeInMS === undefined) {
        useNum = 5;
    }
    return new Promise(resolve => setTimeout(resolve, useNum));
};