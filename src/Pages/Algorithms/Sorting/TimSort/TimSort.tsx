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

export default function Array() {
  const [displayArray, setDisplayArray] = useState(getRandomArray());
  const [sorting, setSorting] = useState(false);
  const sortRef = useRef<boolean>();
  sortRef.current = sorting;

  //for speed of visual sorting
  const [currSpeed, setCurrSpeed] = useState(50);
  const speedRef = useRef<number>();
  speedRef.current = currSpeed; //allows for use of state in async function

    const printArrayRange = (sortArray: number[], left: number, right: number) => {
        while (left <= right) {
            console.log(sortArray[left] + ", ");
            left++;
        }
        console.log(" ");
    }

    // inplace insertion sort
    // replace left with 0 and right with length-1 for normal insertion sort
    const insertionSort = (sortArray: number[], left: number, right: number) => {
        for (let i = left + 1; i <= right; i++) {
            const pivot = sortArray[i];
            let j = i - 1;
            while (j >= left && sortArray[j] > pivot) {
                //swaps values descending until sorted
                // you always know the location of the index to compare to so there is no need for a temp index
                sortArray[j + 1] = sortArray[j];
                j--;
            }
            sortArray[j + 1] = pivot;
        }
    };

    // Merging two array sections logic
    const merge = (MergeArray: number[],leftIndex: number, middleIndex:number, rightIndex: number) => {
        if (middleIndex >= rightIndex) {
            return;
        }
        const leftLen = middleIndex - leftIndex + 1;
        const RightLen = rightIndex - middleIndex;
        const leftArray = [];
        const rightArray = [];

        // initalize the sides / make the two arrays to merge
        for (let i = 0; i < leftLen; i++) {
            leftArray[i] = MergeArray[leftIndex + i];
        }
        for (let i = 0; i < RightLen; i++) {
            rightArray[i] = MergeArray[middleIndex + 1 + i];
        }

        // i,j,k merge logic
        let i = 0;
        let j = 0;
        let k = leftIndex;
        while (i < leftArray.length && j < rightArray.length) {
            if (leftArray[i] < rightArray[j]) {
                MergeArray[k++] = leftArray[i++];
            } else {
                MergeArray[k++] = rightArray[j++];
            }
        }
        // clean up unequal sizes, may or may not happen depending on run size
        while (i < leftArray.length) {
            MergeArray[k++] = leftArray[i++];
        }
        while (j < rightArray.length) {
            MergeArray[k++] = rightArray[j++];
        }

    }

    const timSort = (sortArray: number[]) => {
        const RUN = 10 // normaly this would be 64 but that is vary large for our data set, might be nice for this to be user controled
        const len = sortArray.length;
        for (let i = 0; i < len; i += RUN) {
            insertionSort(sortArray, i, Math.min(i + RUN - 1, len - 1));
        }
        // merge blocks together
        for (let size = RUN; size < len; size *= 2) {
            for (let left = 0; left < len; left += 2 * size) {
                const mid = left + size - 1;
                const right = Math.min(left + 2 * size - 1, len - 1);
                merge(sortArray, left, mid, right);
            }
        }
        return sortArray;

    }

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
        setTimeout(() => {timSort(displayArray);}, 250);
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

        <H>Time Complexity: Slow</H>
        <P>O(n<sup>2</sup>)</P> 
        <P>The time complexity of insertion sort is O(n<sup>2</sup>), where n is the number of elements in the input list.
           This means that the time it takes to sort the list increases quadratically with the number of elements in the list.
           In the worst-case scenario, where the input list is in reverse order, the algorithm will make n<sup>2/2</sup> comparisons and n<sup>2/2</sup> swaps.
           However, if the input list is already partially sorted, insertion sort can have a best-case time complexity of O(n), where only n-1 comparisons and 0 swaps are needed to sort the list.
           In general, insertion sort performs well on small lists or nearly sorted lists, but becomes less efficient on larger, unsorted lists.
           As a result, it is typically not used for large-scale sorting applications, where more efficient algorithms such as quicksort or mergesort are preferred.
        </P>

    </AlgoPageTemplate>
  );
}
