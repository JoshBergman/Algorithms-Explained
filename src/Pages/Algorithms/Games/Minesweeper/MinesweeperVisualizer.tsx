import React from 'react';
import { BiFlag } from 'react-icons/bi';
import { FaVirus } from 'react-icons/fa';

import styles from './Minesweeper.module.css';

interface IMSVisualProps {
    userBoard: any[][];
    msActions: {
        leftClick: (x: number, y: number) => void;
        rightClick: (x: number, y: number) => void;
        clickedMine: () => void;
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

    const getMSIcon = (input: any) => {
        switch(input){
            case 0:
            case 'U':
                return;
                break;
            case 'F':
                return <BiFlag style={{color : "rgb(195, 29, 29)"}} className={styles.cellItem}/>;
                break; 
            case 'M':
                return <FaVirus style={{color : "rgb(195, 29, 29)"}} className={styles.cellItem} />;
                break;
            case 'W':
                return <FaVirus style={{color : "rgb(195, 29, 29)"}} className={styles.clickedMine} />;
                break;
            default:
                return input;
                break;
        }
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
                 className={board[j][i] === 'U' ? styles.cellOther : styles.cell}
                 >
                  {getMSIcon(board[j][i])}
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
    <div className={styles.mainContainer}>
        {mapBoard(userBoard, height, width).map(row => <div className={styles.row} key={nextK()}>{row}</div>)}
    </div>
  );
}
