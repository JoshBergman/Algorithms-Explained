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

export default function Array() {
  const [displayArray, setDisplayArray] = useState(getRandomArray());
  const [sorting, setSorting] = useState(false);

  //for speed of visual sorting
  const [currSpeed, setCurrSpeed] = useState(50);
  const speedRef = useRef<number>();
  speedRef.current = currSpeed; //allows for use of state in async function

  //used to create illusion of actively sorting. Standard method is problematic with recursive functions
  let timeI = 1;
  const nextTime = ():number => {
    let buffer: number = 10;
    if(speedRef.current){
        buffer = speedRef.current;
    }
    timeI++;
    const returnVal = timeI * buffer;
    if(timeI >= 100){
        setTimeout(()=>{setSorting(false)}, returnVal);
    }
    return timeI * buffer;
  };



  const mergeSort = (arr: number[]): number[] => {
    if (arr.length <= 1) {
      return arr;
    }
  
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    return merge(mergeSort(left), mergeSort(right));
  }
  
  const merge = (left: number[], right: number[]) => {
    let resultArray = [], leftIndex = 0, rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
    }
    const leftSide = left.slice(leftIndex);
    const rightSide = right.slice(rightIndex);
    const returnArray = resultArray.concat(leftSide.concat(rightSide));

    setTimeout(() => {
        setDisplayArray(returnArray);
    }, nextTime());
    return returnArray;
  }



  const buttonHandlerReset = () => {
    if(!sorting){
      setDisplayArray(getRandomArray());
      timeI = 0;
    }
  };

  const buttonHandlerSort = () => {
    if(!sorting){
      setSorting(true);
      setTimeout(() => {mergeSort(displayArray);}, 250);
    }
  };


  //page info -------------------------------------------------------------------
  const pageTitle = "MergeSort()";
  const algo = <ArrayVisualizer newArray={displayArray} />
  const buttons = (
    <React.Fragment>        
      <Button onClick={buttonHandlerSort}>Sort</Button>
      <Button onClick={buttonHandlerReset}>{sorting ? "Sorting..." : "Reset"}</Button>
      <Speedometer currSpeed={currSpeed} setSpeed={setCurrSpeed} />
    </React.Fragment>
    );

    const bubbleText = `
    const mergeSort = (arr: number[]): number[] => {^
      if (arr.length <= 1) {^
        return arr;^
      }^
    ^
      const mid = Math.floor(arr.length / 2);^
      const left = arr.slice(0, mid);^
      const right = arr.slice(mid);^
      ^
      return merge(mergeSort(left), mergeSort(right));^
    }^
    ^
    const merge = (left: number[], right: number[]) => {^
      let resultArray = [], leftIndex = 0, rightIndex = 0;^
    ^
      while (leftIndex < left.length && rightIndex < right.length) {^
        if (left[leftIndex] < right[rightIndex]) {^
          resultArray.push(left[leftIndex]);^
          leftIndex++;^
        } else {^
          resultArray.push(right[rightIndex]);^
          rightIndex++;^
        }^
      }^
      const leftSide = left.slice(leftIndex);^
      const rightSide = right.slice(rightIndex);^
      const returnArray = resultArray.concat(leftSide.concat(rightSide));^
  ^
      return returnArray;^
    };^
    `

  return (
    <AlgoPageTemplate algo={algo} title={pageTitle} buttonContainer={buttons}>

        <H centered={true}>MergeSort Overview</H>
        <P>Merge sort is a simple and efficient algorithm used to sort a list of elements in ascending or descending order. 
          It works by dividing the list into two halves recursively until each half contains only one element. 
          Then, it merges the two halves together, comparing each element and arranging them in the correct order.
        </P>

        <H>MergeSort() Implementation (TS)</H>
        <CodeSnippet>
          {bubbleText}
        </CodeSnippet>

        <H>How MergeSort Works</H>
        <P>To begin, the algorithm divides the input list into two halves and recursively applies the same process to each half, continuing to divide the list until each half contains only one element.
           This process is known as the "divide" step of the algorithm.
        </P>
        <P>
        Once the list has been divided into its smallest possible pieces, the "merge" step begins. 
        During the merge step, the algorithm compares the first element of each sub-list and selects the smaller of the two elements. 
        The selected element is then moved to a new, sorted list, and the comparison continues with the next element in the sub-list from which the selected element was taken. 
        This process is repeated until all the elements have been sorted and merged into the new, sorted list.
        </P>

        <TCContainer>
            <TC type={"Best"}>O(n log(n))</TC>
            <TC type={"Average"}>O(n log(n))</TC>
            <TC type={"Worse"}>O(n log(n))</TC>
        </TCContainer>

    </AlgoPageTemplate>
  );
}
