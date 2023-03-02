import React, { useState, useRef } from 'react';
import AlgoPageTemplate from '../../../../Components/UI/PageComponents/AlgoPageTemplate/AlgoPageTemplate';

//Page Elements
import P from '../../../../Components/UI/PageComponents/AlgoPageTemplate/P';
import H from '../../../../Components/UI/PageComponents/AlgoPageTemplate/H';
import CodeSnippet from '../../../../Components/UI/PageResources/CodeSnippet/CodeSnippet';
import ArrayVisualizer from '../../../../Components/Visualizers/ArrayVisualizer/ArrayVisualizer';
import Button from '../../../../Components/UI/PageComponents/Button/Button';
import Speedometer from '../../../../Components/UI/PageComponents/Speedometer/Speedometer';

//Helpers
import { getRandomArray } from '../../../../Components/Helpers/Random-Array';
import { sleep } from '../../../../Components/Helpers/Sleep';

export default function SelectionSort() {
  const [displayArray, setDisplayArray] = useState(getRandomArray());
  const [sorting, setSorting] = useState(false);
  const sortRef = useRef<boolean>();
  sortRef.current = sorting;

  //for speed of visual sorting
  const [currSpeed, setCurrSpeed] = useState(50);
  const speedRef = useRef<number>();
  speedRef.current = currSpeed; //allows for use of state in async function

  
  const selectionSort = async (sortArray:number[]) => {
    const arr = sortArray.concat([]);
    const swap = (pos1: number, pos2: number) => {
        let temp = arr[pos1];
        arr[pos1] = arr[pos2];
        arr[pos2] = temp;
    };

    for(let i = 0; i < arr.length; i++){
        let currSmallestIndex = i;

        // visualizer update ---
        await sleep(speedRef.current);
        setDisplayArray(arr.concat([]));
        // /visualizer update ---

        //finds current smallest item
        for(let j = i; j < arr.length; j++){
            if(arr[j] < arr[currSmallestIndex]){
                currSmallestIndex = j;
            }
        }
        //if smallest item is smaller than current item then swap
        if(arr[currSmallestIndex] < arr[i]){
            swap(i, currSmallestIndex);
        }
    }
    setDisplayArray(arr);
    setSorting(false);
    return arr;
 };

//handlers
  const buttonHandlerReset = () => {
    if(!sorting){
      setDisplayArray(getRandomArray());
    }
    if(sorting){
      setSorting(false);
    }
  };

  const buttonHandlerSort = () => {
    if(!sorting){
      setSorting(true);
      setTimeout(() => {selectionSort(displayArray);}, 250);
    }
  };


  //page info -------------------------------------------------------------------
  const pageTitle = "SelectionSort()";
  const algo = <ArrayVisualizer newArray={displayArray} />
  const buttons = (
    <React.Fragment>        
      <Button onClick={buttonHandlerSort}>Sort</Button>
      <Button onClick={buttonHandlerReset}>{sorting ? "Pause" : "Reset"}</Button>
      <Speedometer currSpeed={currSpeed} setSpeed={setCurrSpeed} />
    </React.Fragment>
    );

    const algoText = `
    const selectionSort = (sortArray:number[]) => {^
      const arr = sortArray.concat([]);^
      const swap = (pos1: number, pos2: number) => {^
          let temp = arr[pos1];^
          arr[pos1] = arr[pos2];^
          arr[pos2] = temp;^
      };^
      ^
      for(let i = 0; i < arr.length; i++){^
          let currSmallestIndex = i;^
      ^   
          //finds current smallest item^
          for(let j = i; j < arr.length; j++){^
              if(arr[j] < arr[currSmallestIndex]){^
                  currSmallestIndex = j;^
              }^
          }^
          //if smallest item is smaller than current item then swap^
          if(arr[currSmallestIndex] < arr[i]){^
              swap(i, currSmallestIndex);^
          }^
      }^
      return arr;^
  };^
  `

  return (
    <AlgoPageTemplate algo={algo} title={pageTitle} buttonContainer={buttons}>

        <H centered={true}>BubbleSort Overview</H>
        <P>Bubble sort is a simple sorting algorithm that is used to arrange elements of a list or array in ascending or descending order.
           It is a straightforward algorithm that compares each element of an array to its adjacent element,
           and if they are not in the desired order, they are swapped.
        </P>

        <H>InsertionSort() Implementation (TS)</H>
        <CodeSnippet>
          {algoText}
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
