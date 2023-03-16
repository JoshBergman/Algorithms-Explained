
/*
TYPESCRIPT MINESWEEPER
REPRESENTED AS AN ARRAY FOR USE IN REACT
*/
// key:
    // User Board
    // 'U' Unknown cell
    // '0' Empty cell
    // '1-8' Quantity of mines nearby

    // Game Board
    // '0' No mine
    // '1' Mine
// /key

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


//game functions
const generateGameBoard = (gameBoard: number[][], userBoard: any[][], firstClickX: number, firstClickY: number) => {
    for(let i = 0; i < width; i++){
        const thisColumn = [];
        const userColumn = [];
        for(let j = 0; j < height; j++){
            thisColumn.push(Math.random() >= 0.70 ? 1 : 0);
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
    const surrounding = checkBoundary(x, y, 1);
    let totalMines = 0;

    if(surrounding.left){
        totalMines += board[x-1][y];
    }
    if(surrounding.topLeft){
        totalMines += board[x-1][y+1];
    }
    if(surrounding.top){
        totalMines += board[x][y+1];
    }
    if(surrounding.topRight){
        totalMines += board[x+1][y+1];
    }
    if(surrounding.right){
        totalMines += board[x+1][y];
    }
    if(surrounding.bottomRight){
        totalMines += board[x+1][y-1];
    }
    if(surrounding.bottom){
        totalMines += board[x][y-1];
    }
    if(surrounding.bottomLeft){
        totalMines += board[x-1][y-1];
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
        
        clearNext(game, user, -1, 0); //left
        clearNext(game, user, -1, 1); //top left
        clearNext(game, user, 0, 1); //top
        clearNext(game, user, 1, 1); //top right
        clearNext(game, user, 1, 0); //right
        clearNext(game, user, 1, -1); //bottom right
        clearNext(game, user, 0, -1) //bottom
        clearNext(game, user, -1, -1) //bottom left
    }
};

const popCellsByZero = (game: number[][], user: any[][]) => {
    for(let i = 0; i < user.length; i++){
        for(let j = 0; j < user[0].length; j++){
            const surrounding = checkBoundary(i, j, 1);

            if(surrounding.left && user[i-1][j] === 0){
                leftClick(game, user, i, j);
            }
            else if(surrounding.topLeft && user[i-1][j+1] === 0){
                leftClick(game, user, i, j);
            }
            else if(surrounding.top && user[i][j+1] === 0){
                leftClick(game, user, i, j);
            }
            else if(surrounding.topRight && user[i+1][j+1] === 0){
                leftClick(game, user, i, j);
            }
            else if(surrounding.right && user[i+1][j] === 0){
                leftClick(game, user, i, j);
            }
            else if(surrounding.bottomRight && user[i+1][j-1] === 0){
                leftClick(game, user, i, j);
            }
            else if(surrounding.bottom && user[i][j-1] === 0){
                leftClick(game, user, i, j);
            }
            else if(surrounding.bottomLeft && user[i-1][j-1] === 0){
                leftClick(game, user, i, j);
            }
        }
    }
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

export const msGame = {
    generateGameBoard: generateGameBoard,
    leftClick: leftClick,
    rightClick: rightClick,
    getDefaultBoard: getDefaultBoard,
    showMinesOnLoss: showMinesOnLoss
};