import React, { useState } from 'react';
import AlgoPageTemplate from '../../../../Components/UI/PageComponents/AlgoPageTemplate/AlgoPageTemplate';

//Page Elements
import P from '../../../../Components/UI/PageComponents/AlgoPageTemplate/P';
import H from '../../../../Components/UI/PageComponents/AlgoPageTemplate/H';
import CodeSnippet from '../../../../Components/UI/PageResources/CodeSnippet/CodeSnippet';
import Button from '../../../../Components/UI/PageComponents/Button/Button';

//Helpers
import { sleep } from '../../../../Components/Helpers/Sleep';
import MinesweeperVisualizer from './MinesweeperVisualizer';

export default function Minesweeper() {
  const [userBoard, setUserBoard] = useState([[1, 1], [1, 1]]);
  const [gameBoard, setGameBoard] = useState([[1, 0], [0, 1]]);
  const tempBoard = [
    [
      'U', 'U', 'U',
      'U', 'U', 'U',
      'U', 'U'
    ],
    [
      'U', 'U', 'U',
      'U', 'U', 'U',
      'U', 'U'
    ],
    [
      'U', 'U', 'U',
      'U', 'U', 'U',
      'U', 'U'
    ],
    [
      'U', 'U', 'U', 0,
      0,   'U', 'U', 'U'
    ],
    [
      0, 0,   0,   0,
      0, 'U', 'U', 'U'
    ],
    [
      0, 'U', 'U', 'U',
      0, 'U', 'U', 'U'
    ],
    [
      'U', 'U', 'U', 'U',
      0,   'U', 'U', 'U'
    ],
    [
      'U', 'U', 'U',
      'U', 'U', 'U',
      'U', 'U'
    ],
    [
      'U', 'U', 'U',
      'U', 'U', 'U',
      'U', 'U'
    ],
    [
      'U', 'U', 'U',
      'U', 'U', 'U',
      'U', 'U'
    ]
  ];

  const buttonHandlerReset = () => {
  };

  const buttonHandlerSort = () => {
  };


  //page info -------------------------------------------------------------------
  const pageTitle = "Minesweeper";
  const algo = <MinesweeperVisualizer userBoard={tempBoard}/>
  const buttons = (
    <React.Fragment>        
      <Button onClick={buttonHandlerSort}>Sort</Button>
      <Button onClick={buttonHandlerReset}>Sorter</Button>
    </React.Fragment>
    );

    const snippetText = `
    const bubbleSort = (arr: number[]) => {^
      for (let i = 0; i < arr.length; i++){^
        for (let j = 0; j < (arr.length - i - 1); j++){^^
          if(arr[j] > arr[j+1]){^
            let temp = arr[j];^
            arr[j] = arr[j+1];^
            arr[j+1] = temp;^
          }
          }
        }
    };`

  return (
    <AlgoPageTemplate algo={algo} title={pageTitle} buttonContainer={buttons}>

        <H centered={true}>BubbleSort Overview</H>
        <P>Bubble sort is a simple sorting algorithm that is used to arrange elements of a list or array in ascending or descending order.
           It is a straightforward algorithm that compares each element of an array to its adjacent element,
           and if they are not in the desired order, they are swapped.
        </P>

        <H>BubbleSort() Implementation (TS)</H>
        <CodeSnippet>
          {snippetText}
        </CodeSnippet>

        <H>How BubbleSort Works</H>
        <P>To start, the algorithm looks at the first two items in the list and compares them.
           If the first item is greater than the second item, they are swapped. Then, the algorithm moves on to the second and third items in the list and compares them.
            If they are in the wrong order, they are swapped as well. 
           This process continues, comparing and swapping adjacent items until the end of the list is reached.
        </P>
        <P>
          At this point, the algorithm has completed one pass through the list.
          However, there may still be items in the wrong order.
          So, the algorithm starts again at the beginning of the list and repeats the process of comparing and swapping adjacent items until the end of the list is reached.
           This process is repeated until no more swaps are needed, meaning the list is fully sorted.
        </P>

        <H>Time Complexity: Slow</H>
        <P>Best: O(n)</P> 
        <P>Worst: O(n<sup>2</sup>)</P>
        <P>While bubble sort is easy to understand and implement, it can be quite slow for large lists.
           This is because it requires many passes through the list, and each pass may only swap a few items at a time.
           However, for small lists or lists that are already mostly sorted, bubble sort can be a quick and effective way to sort items.
        </P>

    </AlgoPageTemplate>
  );
}
