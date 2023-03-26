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

export default function QuickSort() {
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

  const quickSort = (sortArray: number[]): number[] => {
    const arr = sortArray.concat([]);
    if (arr.length <= 1) {
        return arr;
    } else {
        let left = [];
        let right = [];
        let storage: number[] = [];

        let pivot = arr.pop()! // .pop()"!" sets return type of .pop() to not include undefined
        let len = arr.length;

        for (let i = 0; i < len; i++) {
            if (arr[i] <= pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        let sortedLeft = quickSort(left);
        let sortedRight = quickSort(right)
        let merged = storage.concat(sortedLeft, pivot, sortedRight);

        //visualizer update
        setTimeout(() => {
          setDisplayArray(merged.concat([]));
        }, nextTime());

        if(merged.length >= 100){
          setTimeout(() => setSorting(false), nextTime());
        }
        // /visualizer update

        return merged;
    }
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
      setTimeout(() => {quickSort(displayArray);}, 250);
    }
  };


  //page info -------------------------------------------------------------------
  const pageTitle = "QuickSort()";
  const algo = <ArrayVisualizer newArray={displayArray} />
  const buttons = (
    <React.Fragment>        
      <Button onClick={buttonHandlerSort}>Sort</Button>
      <Button onClick={buttonHandlerReset}>{sorting ? "Sorting..." : "Reset"}</Button>
      <Speedometer currSpeed={currSpeed} setSpeed={setCurrSpeed} />
    </React.Fragment>
    );

    const bubbleText = `
  const quickSort = (sortArray: number[]): number[] => {^
    const arr = sortArray.concat([]);^
    if (arr.length <= 1) {^
        return arr;^
    } else {^
        let left = [];^
        let right = [];^
        let storage: number[] = [];^
        ^
        let pivot = arr.pop()!  // .pop()"!" sets return type of .pop() to not include undefined^
        let len = arr.length;^
        ^
        for (let i = 0; i < len; i++) {^
            if (arr[i] <= pivot) {^
                left.push(arr[i]);^
            } else {^
                right.push(arr[i]);^
            }^
        }^
        ^
        let sortedLeft = quickSort(left);^
        let sortedRight = quickSort(right)^
        let merged = storage.concat(sortedLeft, pivot, sortedRight);^
        ^
        return merged;^
      }^
  }^
    `;

  return (
    <AlgoPageTemplate algo={algo} title={pageTitle} buttonContainer={buttons}>

        <H centered={true}>QuickSort Overview</H>
        <P>
          Quicksort is a popular sorting algorithm that uses a divide-and-conquer approach to sort an array of elements. The basic idea behind the algorithm is to partition the array into smaller sub-arrays, and then recursively sort each sub-array.
        </P>

        <H>QuickSort() Implementation (TS)</H>
        <CodeSnippet>
          {bubbleText}
        </CodeSnippet>

        <H>How QuickSort Works</H>
        <P>
          The algorithm selects a "pivot" element from the array, and then partitions the remaining elements into two sub-arrays, one containing elements that are smaller than the pivot and the other containing elements that are larger than the pivot. This partitioning process is performed using a partition function, which rearranges the elements of the array in such a way that all elements smaller than the pivot appear before it, and all elements larger than the pivot appear after it.
        </P>
        <P>
          Once the array has been partitioned, the algorithm recursively sorts each sub-array by selecting a new pivot and repeating the partitioning process until each sub-array contains only one element. At this point, the sub-arrays are already sorted, and the algorithm can merge them back together to produce a sorted array.
        </P>
        <P>
          One important aspect of quicksort is the choice of pivot. A good pivot should be chosen such that it partitions the array into two roughly equal sub-arrays. This ensures that the algorithm runs efficiently and avoids worst-case performance scenarios where the partitioning produces highly imbalanced sub-arrays.
        </P>

        <TCContainer>
            <TC type={"Best"}>O(n log(n))</TC>
            <TC type={"Average"}>O(n log(n))</TC>
            <TC type={"Worse"}>O(n<sup>2</sup>)</TC>
        </TCContainer>

    </AlgoPageTemplate>
  );
}
