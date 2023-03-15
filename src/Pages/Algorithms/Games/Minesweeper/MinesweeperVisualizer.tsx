import React from 'react';

import styles from './Minesweeper.module.css';

interface IMSVisualProps {
    userBoard: any[][];
}

export default function MinesweeperVisualizer({userBoard}: IMSVisualProps) {
    const height = userBoard[0].length - 1;
    const width = userBoard.length;
    
    //nextK() used for keys
    let k = 0;
    const nextK = () => {
        k = k + 1;
        return k;
    };

    const mapBoard = (board: any[][], thisHeight: number, thisWidth: number) => {
        const renderableBoard = [];
        for(let i = thisHeight; i >= 0; i--){
            const boardRow = [];
            for(let j = 0; j < thisWidth; j++){
                boardRow.push(<div key={nextK()} className={styles.cell}>{board[j][i]}</div>);
            }
            renderableBoard.push(boardRow);
        }

        return renderableBoard;
    };

    const auxHandler = (e:any) => {
        e.preventDefault();
        console.log("Right Click")
    }

    const other = () => {
        console.log("Left Click");
    }

  return (
    <div onContextMenu={auxHandler} onClick={other}>
        {mapBoard(userBoard, height, width).map(row => <div className={styles.row} key={nextK()}>{row}</div>)}
    </div>
  )
}
