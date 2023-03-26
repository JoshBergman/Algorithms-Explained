import React, { useState, useRef } from 'react';
import AlgoPageTemplate from '../../../../Components/UI/PageComponents/AlgoPageTemplate/AlgoPageTemplate';

//Page Elements
import P from '../../../../Components/UI/PageComponents/AlgoPageTemplate/P';
import H from '../../../../Components/UI/PageComponents/AlgoPageTemplate/H';
import TC from '../../../../Components/UI/PageComponents/AlgoPageTemplate/TC';
import TCContainer from '../../../../Components/UI/PageComponents/AlgoPageTemplate/TCContainer';
import CodeSnippet from '../../../../Components/UI/PageResources/CodeSnippet/CodeSnippet';
import ArrayVisualizer from '../../../../Components/Visualizers/ArrayVisualizer/ArrayVisualizer';
import Button from '../../../../Components/UI/PageComponents/Button/Button';
import Speedometer from '../../../../Components/UI/PageComponents/Speedometer/Speedometer';

//Helpers
import { getRandomArray } from '../../../../Components/Helpers/Random-Array';
import { sleep } from '../../../../Components/Helpers/Sleep';

export default function Array() {
  const [displayArray, setDisplayArray] = useState(getRandomArray());
  const [sorting, setSorting] = useState(false);
  const sortRef = useRef<boolean>();
  sortRef.current = sorting;

  //for speed of visual sorting
  const [currSpeed, setCurrSpeed] = useState(50);
  const speedRef = useRef<number>();
  speedRef.current = currSpeed; //allows for use of state in async function

  
  const insertionSort = async(sortArray:number[]) => {
    const arr = sortArray.concat([]);
    let prevItemIndex: number, tempIndex: number;

    for(let i = 1; i < arr.length; i++){
        tempIndex = i;
        prevItemIndex = i - 1;

        // Visualizer instructions
        if(sortRef.current === false){
          break;
        } else {
          await sleep(speedRef.current);
          setDisplayArray(arr.concat([]));
        }
        // /Visualizer instructions

        while(prevItemIndex >= 0 && arr[tempIndex] < arr[prevItemIndex]){
            //swaps values descending until sorted
            const swapTemp = arr[prevItemIndex];
            arr[prevItemIndex] = arr[tempIndex];
            arr[tempIndex] = swapTemp;

            // Visualizer instructions
              await sleep(speedRef.current);
              setDisplayArray(arr.concat([]));
            // /Visualizer instructions

            //decrements
            tempIndex = tempIndex - 1;
            prevItemIndex = prevItemIndex - 1;
        }
    }
    setDisplayArray(arr.concat([]));
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
      setTimeout(() => {insertionSort(displayArray);}, 250);
    }
  };


  //page info -------------------------------------------------------------------
  const pageTitle = "InsertionSort()";
  const algo = <ArrayVisualizer newArray={displayArray} />
  const buttons = (
    <React.Fragment>        
      <Button onClick={buttonHandlerSort}>Sort</Button>
      <Button onClick={buttonHandlerReset}>{sorting ? "Pause" : "Reset"}</Button>
      <Speedometer currSpeed={currSpeed} setSpeed={setCurrSpeed} />
    </React.Fragment>
    );

    const algoText = `
    const insertionSort = (sortArray:number[]): number[] => {^
      const arr = sortArray.concat([]);^
      let prevItemIndex: number, tempIndex: number;^
      ^
      for(let i = 1; i < arr.length; i++){^
          tempIndex = i;^
          prevItemIndex = i - 1;^
      ^
          while(prevItemIndex >= 0 && arr[tempIndex] < arr[prevItemIndex]){^
              //swaps values descending until sorted^
              const swapTemp = arr[prevItemIndex];^
              arr[prevItemIndex] = arr[tempIndex];^
              arr[tempIndex] = swapTemp;^
      ^
              //decrements^
              tempIndex = tempIndex - 1;^
              prevItemIndex = prevItemIndex - 1;^
          }^
      }^
      return arr;^
  };^
  `

  return (
    <AlgoPageTemplate algo={algo} title={pageTitle} buttonContainer={buttons}>

        <H centered={true}>InsertionSort Overview</H>
        <P>Insertion sort is a simple and intuitive algorithm used to sort a list of elements in ascending or descending order.
           It works by dividing the list into two parts: a sorted part and an unsorted part.
           At the beginning, the sorted part is empty, and the unsorted part is the entire list.
        </P>

        <P>
        The algorithm iterates through the unsorted part of the list, one element at a time, and inserts each element into its correct position in the sorted part of the list. To do this, it compares the current element with the elements in the sorted part of the list, starting from the right end, until it finds the correct position to insert the current element.
        </P>

        <P>
        The algorithm repeats this process for each element in the unsorted part of the list until the entire list is sorted. At the end of each iteration, the last element in the sorted part of the list is the largest element seen so far.
        </P>

        <H>InsertionSort() Implementation (TS)</H>
        <CodeSnippet>
          {algoText}
        </CodeSnippet>

        <TCContainer>
            <TC type={"Best"}>O(n)</TC>
            <TC type={"Average"}>O(n<sup>2</sup>)</TC>
            <TC type={"Worse"}>O(n<sup>2</sup>)</TC>
        </TCContainer>

    </AlgoPageTemplate>
  );
}
