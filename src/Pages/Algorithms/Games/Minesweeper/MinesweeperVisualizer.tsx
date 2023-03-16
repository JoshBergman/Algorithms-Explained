import React from 'react';

import styles from './Minesweeper.module.css';

interface IMSVisualProps {
    userBoard: any[][];
    msActions: {
        leftClick: (x: number, y: number) => void;
        rightClick: (x: number, y: number) => void;
    }
}

export default function MinesweeperVisualizer({userBoard, msActions}: IMSVisualProps) {
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
                boardRow.push(
                <div 
                 onContextMenu={(e) => {
                    e.preventDefault(); 
                    cellRightClickHandler(j, i);
                    }
                } 
                 onClick={() => {
                    cellLeftClickHandler(j, i);
                    }
                } 
                 key={nextK()} 
                 className={styles.cell}
                 >
                  {board[j][i]}
                </div>
                );
            }
            renderableBoard.push(boardRow);
        }

        return renderableBoard;
    };

    const cellRightClickHandler = (x: number, y: number) => {
        msActions.rightClick(x, y);
    }

    const cellLeftClickHandler = (x: number, y: number) => {
        msActions.leftClick(x, y);
    }

  return (
    <div>
        {mapBoard(userBoard, height, width).map(row => <div className={styles.row} key={nextK()}>{row}</div>)}
    </div>
  );
}
