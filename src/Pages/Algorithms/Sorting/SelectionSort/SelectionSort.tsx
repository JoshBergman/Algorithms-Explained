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

        <H centered={true}>SelectionSort Overview</H>
        <P>Selection sort is a simple and intuitive algorithm used to sort a list of elements in ascending or descending order. 
          It works by repeatedly finding the smallest element in the unsorted part of the list and moving it to the beginning of the sorted part of the list.
        </P>

        <H>SelectionSort() Implementation (TS)</H>
        <CodeSnippet>
          {algoText}
        </CodeSnippet>

        <H>How SelectionSort Works</H>
        <P>To begin, the algorithm starts with the entire list as the unsorted part and an empty list as the sorted part. 
          Then, it finds the smallest element in the unsorted part of the list and moves it to the beginning of the sorted part of the list. 
          This process is repeated for each element in the unsorted part of the list, until the entire list is sorted.
        </P>

        <P>
          To find the smallest element in the unsorted part of the list, the algorithm compares each element in the unsorted part of the list with the current smallest element, which is initially set to the first element of the unsorted part of the list. 
          If a smaller element is found, the current smallest element is updated to be the new smallest element.
        </P>

        <TCContainer>
            <TC type={"Best"}>O(n<sup>2</sup>)</TC>
            <TC type={"Average"}>O(n<sup>2</sup>)</TC>
            <TC type={"Worse"}>O(n<sup>2</sup>)</TC>
        </TCContainer>

    </AlgoPageTemplate>
  );
}
