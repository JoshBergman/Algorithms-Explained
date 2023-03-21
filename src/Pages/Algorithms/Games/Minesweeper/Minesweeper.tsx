import React, { useState } from 'react';
import AlgoPageTemplate from '../../../../Components/UI/PageComponents/AlgoPageTemplate/AlgoPageTemplate';

//Page Elements
import P from '../../../../Components/UI/PageComponents/AlgoPageTemplate/P';
import H from '../../../../Components/UI/PageComponents/AlgoPageTemplate/H';
import CodeSnippet from '../../../../Components/UI/PageResources/CodeSnippet/CodeSnippet';

//Helpers
import { msGame } from './MinesweeperFunctions';
import MinesweeperVisualizer from './MinesweeperVisualizer';
import Button from '../../../../Components/UI/PageComponents/Button/Button';

export default function Minesweeper() {
  const [userBoard, setUserBoard] = useState<any[][]>( msGame.getDefaultBoard() );
  const [gameBoard, setGameBoard] = useState([[1, 0], [0, 1]]);
  const [solving, setSolving] = useState(false);

  const [started, setStarted] = useState(false);
  const [lost, setLost] = useState(false);

  const firstClick = (x: number, y: number) => {
    const newGameBoard: number[][] = [];
    const newUserBoard: any[][] = [];
    msGame.generateGameBoard(newGameBoard, newUserBoard, x, y);

    setGameBoard(newGameBoard);
    setUserBoard(newUserBoard);
    };

  const leftClick = (x: number, y: number) => {
    if(!started && !lost){
      setStarted(true);
      firstClick(x, y);
      return;
    }
    else if (!lost){
    const user = userBoard.concat([]);

    const failed = msGame.leftClick(gameBoard, user, x, y);
    setUserBoard(user);

    if (failed) {
      setLost(true);
    }
    }
  };

  const rightClick = (x: number, y: number) => {
    if(lost){
      return;
    }
    const user = userBoard.concat([]);

    msGame.rightClick(user, x, y);
    setUserBoard(user);
  };

  const clickedMine = () => {
    setLost(true);
  };

  const doSolve = () => {
    if(solving){
      return;
    }
    setSolving(true);
    autoSolve();
  };

  const autoSolve = async () => {
    await msGame.solve(userBoard, gameBoard, setUserBoard);
    setSolving(false);
  };

  const reset = () => {
    setUserBoard( msGame.getDefaultBoard() );
    setLost(false);
    setStarted(false);
  };

  const msActions = {
    leftClick: leftClick,
    rightClick: rightClick,
    clickedMine: clickedMine,
  };


  //page info -------------------------------------------------------------------
  const pageTitle = "Minesweeper & Solver";
  const algo = <MinesweeperVisualizer userBoard={userBoard} msActions={msActions}/>
  const buttons = (
    <React.Fragment>     
    {solving ? <Button onClick={() => {}}>Solving...</Button> :
    <React.Fragment>
      <Button onClick={reset} >Reset</Button>   
      {started ? <Button onClick={doSolve} >Solve</Button> : ""}
    </React.Fragment>
    }
    </React.Fragment>
    );

    const snippetText = `
    (Code shown is pseudo-code and will not run)^
    ^
    ^
      while(solvingGame){^
        goToNextCell();^
        ^
        if(thisCell > 0 && thisCell < 9){^
          if(thisCell - nearbyFlags === unknownCells){^
            flagAllNeighbors();^
          }^
          else if (thisCell === nearbyFlags){^
            popAllUknownCellsNearby();^
          }^
          else if (noLegalMoves){^
            clickRandomUnkownCell();^
          }^
        }^
      }^
    `

  return (
    <AlgoPageTemplate algo={algo} title={pageTitle} buttonContainer={buttons}>

        <H centered={true}>Minesweeper Overview</H>
        <P>
          Minesweeper is a popular computer game that has been around for several decades. 
          The game was first developed in the 1960s by a mainframe programmer named Curt Johnson, who created a version of the game called "Cube." 
          However, it wasn't until the 1980s, when personal computers became more widely available, that the game gained widespread popularity. 
          The first version of Minesweeper as we know it today was included as part of the Microsoft Entertainment Pack for Windows 3.1 in 1990. 
          The game quickly became a favorite among Windows users and was included as a default game in all subsequent versions of Windows until Windows 8, when it was removed in favor of other games. Despite its simplicity, Minesweeper has proven to be a challenging and addictive game that has stood the test of time. 
          Today, it continues to be available as a standalone game on various platforms and is a favorite among casual gamers around the world.
        </P>

        <H centered={true}>How To Play</H>
        <P>
          Minesweeper is a logic-based computer game that is easy to learn but can be challenging to master. 
          The goal of the game is to uncover all the squares on a grid without detonating any hidden mines. 
          To start, you will see a grid of squares, some of which may contain mines. 
          Your task is to click on a square to reveal what's underneath it. 
          If the square contains a mine, the game is over, and you lose. 
          However, if the square is safe, it will reveal a number indicating how many mines are adjacent to that square. 
          Based on the numbers revealed, you can deduce which squares are safe to click and which ones contain mines. 
          To flag a square that you think contains a mine, right-click on it to place a flag. 
          The game is won when all the safe squares have been revealed, and all the mines have been flagged. 
        </P>

        <H>How THIS Minesweeper Solver Works</H>
        <P>
          The visualized implementation of a minesweeper solver is by no means the best, but it is lightweight enough to work in a browser.
          The core functionality of the solver is to repeat these steps for each cell:
          1. Flag any mines that have a 100% chance to be a mine.
          2. If the amount of nearby flags is equal to the amount of nearby mines, click each unflagged cell.
          3. If no legal or safe moves can be played, click a surrounding unknown cell at random.
        </P>

        <H>Pseudo Code For This Implementation</H>
        <CodeSnippet>
          {snippetText}
        </CodeSnippet>

    </AlgoPageTemplate>
  );
}
