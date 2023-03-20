import React, { useState, useEffect, useCallback } from 'react';

import { msGame } from '../../../../Pages/Algorithms/Games/Minesweeper/MinesweeperFunctions';
import MinesweeperVisualizer from '../../../../Pages/Algorithms/Games/Minesweeper/MinesweeperVisualizer';

export default function AutoSweeper() {
  const [userBoard, setUserBoard] = useState<any[][]>( msGame.getDefaultBoard() );
  const [started, setStarted] = useState(false);

  const firstClick = useCallback(() => {
    setUserBoard(msGame.getDefaultBoard());
    const newGameBoard: number [][] = [];
    const newUserBoard: any[][] = [];
    
    setTimeout(()=>{
      msGame.generateGameBoard(newGameBoard, newUserBoard, 3, 3);
      setUserBoard(newUserBoard);
    }, 50)
    
    setTimeout(()=> {
      msGame.solve(newUserBoard, newGameBoard, setUserBoard, firstClick);
    }, 100);
    
  }, []);
  
  useEffect(() => {
    if(!started){
      firstClick();
      setStarted(true);
    }
    console.log("Effect running")
  }, [started, firstClick]);

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
