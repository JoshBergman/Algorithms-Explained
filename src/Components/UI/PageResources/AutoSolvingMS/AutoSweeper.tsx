import React, { useState, useEffect } from 'react';

import { msGame } from '../../../../Pages/Algorithms/Games/Minesweeper/MinesweeperFunctions';
import MinesweeperVisualizer from '../../../../Pages/Algorithms/Games/Minesweeper/MinesweeperVisualizer';

export default function AutoSweeper() {
  const [userBoard, setUserBoard] = useState<any[][]>( msGame.getDefaultBoard() );
  const [gameBoard, setGameBoard] = useState([[1, 0], [0, 1]]);
  const [started, setStarted] = useState(false);

  const firstClick = () => {
    setUserBoard(msGame.getDefaultBoard());
    const newGameBoard: number [][] = [];
    const newUserBoard: any[][] = [];

    setTimeout(()=>{
      msGame.generateGameBoard(newGameBoard, newUserBoard, 3, 3);
      setGameBoard(newGameBoard);
      setUserBoard(newUserBoard);
    }, 50)

    setTimeout(()=> {
      msGame.solve(newUserBoard, newGameBoard, setUserBoard, firstClick);
    }, 100);

  };
  
  let localScopedStarted = false;
  useEffect(() => {
    if(!started && !localScopedStarted){
      firstClick();
      setStarted(true);
      localScopedStarted = true;
      console.log("effect running")
    }
  }, [])

  const msActions = {
    leftClick: () => {},
    rightClick: () => {},
    clickedMine: () => {},
  };
  return (
    <div>
      <MinesweeperVisualizer userBoard={userBoard} msActions={msActions} />
    </div>
  )
}
