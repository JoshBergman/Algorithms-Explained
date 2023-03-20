/*
TYPESCRIPT MINESWEEPER
REPRESENTED AS AN ARRAY FOR USE IN REACT
*/
// key:
    // User Board
    // 'U' Unknown cell
    // '0' Empty cell
    // '1-8' Quantity of mines nearby
    // 'M' Mine //only on lose
    // 'W' Clicked Mine //causes lose

    // Game Board
    // '0' No mine
    // '1' Mine 

import { sleep } from "../../../../Components/Helpers/Sleep";
const height = 10;
const width = 11;

//helpers
const checkBoundary = (x: number, y: number, modifier: number = 0) => {
    //returns object of boundary booleans
    const thisHeight = height - 1;
    const thisWidth = width - 1;

    const boundaries = {
        left: (x - modifier >= 0),
        right: (x + modifier <= thisWidth),
        top: (y + modifier <= thisHeight),
        bottom: (y - modifier >= 0),
    };
    const corners = {
        topLeft: (boundaries.left && boundaries.top),
        topRight: (boundaries.right && boundaries.top),
        bottomRight: (boundaries.right && boundaries.bottom),
        bottomLeft: (boundaries.left && boundaries.bottom),
    };
    const allBoundaries = {
        ...boundaries,
        ...corners,
        total: (corners.topLeft && corners.bottomRight),
    };
    return allBoundaries;
};

const checkInboundCell = (x: number, y: number) => {
    if( ((x >= 0) && (x <= width-1)) && ((y <= height-1) && (y >= 0)) ){
        return true;
    }
    return false;
};

const getBorderCoords = () => {
    const coords = [
        [-1, 0], //left
        [1, 0], //right
        [0, 1], //top
        [0, -1], //bottom
        [-1, 1], //topLeft
        [1, 1], //topRight
        [1, -1], //bottomRight
        [-1, -1] //bottomLeft
    ]

    return coords;
}

const getBoundariesAndCoords = (x: number, y: number) => {
    const surrounding = checkBoundary(x, y, 1);
    const possibleSyntax = [
        [surrounding.left, -1, 0],
        [surrounding.right, 1, 0],
        [surrounding.top, 0, 1],
        [surrounding.bottom, 0, -1],
        [surrounding.topLeft, -1, 1],
        [surrounding.topRight, 1, 1],
        [surrounding.bottomRight, 1, -1],
        [surrounding.bottomLeft, -1, -1]
     ];
     return possibleSyntax;
};


//game functions
const generateGameBoard = (gameBoard: number[][], userBoard: any[][], firstClickX: number, firstClickY: number) => {
    for(let i = 0; i < width; i++){
        const thisColumn = [];
        const userColumn = [];
        for(let j = 0; j < height; j++){
            thisColumn.push(Math.random() >= 0.80 ? 1 : 0);
            userColumn.push('U');
        }
        gameBoard.push(thisColumn);
        userBoard.push(userColumn);
    }

    //clears out small region around first click
    for(let i = firstClickX - 2; i < firstClickX + 2; i++){
        for(let j = firstClickY - 2; j < firstClickY + 2; j++){
            if(checkInboundCell(i, j)){
                gameBoard[i][j] = 0;
            }
        }
    }
    leftClick(gameBoard, userBoard, firstClickX, firstClickY);
};

const leftClick = (game: number[][], user: any[][], x: number, y: number) => {
    const thisCellValue = game[x][y];
    const thisUserValue = user[x][y];
    switch(thisCellValue){
        case 1:
            if(thisUserValue === 'U'){
                showMinesOnLoss(game, user);
                user[x][y] = 'W';
                return true;
            }
            break;
        case 0:
            if(thisUserValue === 'U' && mineCount(game, x, y) === 0){
                doRegionClear(game, user, x, y);
            } 
            else if(thisUserValue === 'U'){
                user[x][y] = mineCount(game, x, y);
            }
            break;
        default: 
            return;
    }
    return false;
};

const rightClick = (user: any[][], x: number, y: number) => {
    const currUserCell = user[x][y];
    if(currUserCell === 'U'){
        user[x][y] = 'F';
    } else if (currUserCell === 'F'){
        user[x][y] = 'U';
    }
};

const mineCount = (board: number[][], x: number, y: number) => {
    const possibleSyntax = getBoundariesAndCoords(x, y);
    let totalMines = 0;

    for(let i = 0; i < possibleSyntax.length; i++){
        const validDirection: boolean = possibleSyntax[i][0] as boolean;
        const thisX: number = x + (possibleSyntax[i][1] as number);
        const thisY: number = y + (possibleSyntax[i][2] as number);

        if(validDirection){
            totalMines += board[thisX][thisY]
        }
    }
    
    return totalMines;
};

const doRegionClear = (game: number[][], user: any[][], x: number, y: number) => {
    regionClear(game, user, x, y);
    popCellsByZero(game, user);
}

const regionClear = (game: number[][], user: any[][], x: number, y: number) => {
    const mines = mineCount(game, x, y);
    if(mines === 0 && user[x][y] === 'U' && game[x][y] === 0){
        user[x][y] = 0;
        const clearNext = (game: number[][], user: any[][], xMod: number, yMod: number) => {
            const newX = x + xMod;
            const newY = y + yMod;
            if(checkInboundCell(newX, newY)){
                regionClear(game, user, newX, newY);
            }
        };

        const coords = getBorderCoords();
        for(let i = 0; i < coords.length; i++){
            clearNext(game, user, coords[i][0], coords[i][1])
        }
    }
};

const popCellsByZero = (game: number[][], user: any[][]) => {
    for(let i = 0; i < user.length; i++){
    for(let j = 0; j < user[0].length; j++){

        const border = getBoundariesAndCoords(i, j);
        for(let b = 0; b < border.length; b++){
            const validDirection = border[b][0];
            const thisX = i + (border[b][1] as number);
            const thisY = j + (border[b][2] as number);

            if(validDirection && user[thisX][thisY] === 0){
                leftClick(game, user, i, j);
                b = border.length;
            }
        }
        
    }}
}

const getDefaultBoard = () => {
    const pseudoBoard = [];
    for(let i = 0; i < width; i++){
        const thisColumn = [];
        for(let j = 0; j < height; j++){
            thisColumn.push('U');
        }
        pseudoBoard.push(thisColumn);
    }
    return pseudoBoard;
};

const showMinesOnLoss = (game: number[][], user: any[][]) => {
    for(let i = 0; i < game.length; i++){
        for(let j = 0; j < game[0].length; j++){
            if(game[i][j] === 1){
                user[i][j] = 'M';
            }
        }
    }
}

const surroundingCells = (board: any[][], x: number, y: number) => {
    //returns array of content in surroundingcells and their coords
    const theseCells: any[][] = [];

    const directionCheck = (direction: boolean, x: number, y: number) => {
        if(direction){
            theseCells.push([board[x][y], x, y]);
        }
    };
    const border = getBoundariesAndCoords(x, y);
    for(let i = 0; i < border.length; i++){
        const validDirection: boolean = border[i][0] as boolean;
        const thisX = x + (border[i][1] as number);
        const thisY = y + (border[i][2] as number);

        directionCheck(validDirection, thisX, thisY);
    }
    return theseCells;
};

const solve = async (userBoard: any[][], game: number[][], setUserBoard: (newBoard: any[][]) => void, repeatCall?: () => void) => {
    const user = userBoard.concat([])
    let solving = true;
    let unmodified = true;
    let doRandomClick = false;
    let won = true;
    const continueCases = (input: string | number) => {
        switch(input){
            case 'U':
            case 'F':
            case 0:
                return true;
        }
        return false
    }
    while(solving){
        unmodified = true;
        won = true;
    for(let i = 0; i < user.length; i++){
        for(let j = 0; j < user[0].length; j++){
            const thisCell = user[i][j];
            if(thisCell === 'M'){
                solving = false;
                break;
            }
            if(continueCases(thisCell)){
                if(thisCell === 'U'){
                    won = false;
                }
                continue;
            }
            let surroundingFlags = 0;
            let surroundingU = 0;

            const border = surroundingCells(user, i, j);
            border.forEach((cell) => {
                switch(cell[0]){
                    case 'U':
                        surroundingU++;
                        break;
                    case 'F':
                        surroundingFlags++;
                        break;
                }
            });
            if(surroundingU === 0){
                continue;
            }
            if(thisCell - surroundingFlags === 0){
                await sleep(100);
                for(let e = 0; e < border.length; e++){
                    if(border[e][0] === 'U'){
                        unmodified = false;
                        leftClick(game, user, border[e][1], border[e][2]);
                        setUserBoard(user.concat([]));
                    }
                }
            }
            else if (thisCell - surroundingFlags === surroundingU){
                await sleep(100);
                for(let e = 0; e < border.length; e++){
                    if(border[e][0] === 'U'){
                        unmodified = false;
                        rightClick(user, border[e][1], border[e][2]);
                        setUserBoard(user.concat([]));
                    }
                }
            } else if(doRandomClick){
                let completedClick = false;
                for(let e = 0; e < border.length; e++){
                    if(border[e][0] === 'U'){
                        if(!completedClick){
                        leftClick(game, user, border[e][1], border[e][2]);
                        completedClick = false;
                        doRandomClick = false;
                        }
                    }
                }
            }
        }
    }
    if(unmodified){
        if(doRandomClick){
            break;
        }
        if(won){
            break;
        }
        doRandomClick = true;
    }
}
    setUserBoard(user);
    if(repeatCall){
        setTimeout(() => {
            repeatCall();
        }, 400);
    }
};

export const msGame = {
    generateGameBoard: generateGameBoard,
    leftClick: leftClick,
    rightClick: rightClick,
    getDefaultBoard: getDefaultBoard,
    showMinesOnLoss: showMinesOnLoss,
    solve: solve,
};