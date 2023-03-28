import React, { useState, useRef } from "react";
import AlgoPageTemplate from "../../../../Components/UI/PageComponents/AlgoPageTemplate/AlgoPageTemplate";

//Page Elements
import P from "../../../../Components/UI/PageComponents/AlgoPageTemplate/P";
import H from "../../../../Components/UI/PageComponents/AlgoPageTemplate/H";
import RefLink from "../../../../Components/UI/PageComponents/AlgoPageTemplate/RefLink";
import CodeSnippet from "../../../../Components/UI/PageResources/CodeSnippet/CodeSnippet";
import ArrayVisualizer from "../../../../Components/Visualizers/ArrayVisualizer/ArrayVisualizer";
import Button from "../../../../Components/UI/PageComponents/Button/Button";
import Speedometer from "../../../../Components/UI/PageComponents/Speedometer/Speedometer";

//Helpers
import { getRandomArray } from "../../../../Components/Helpers/Random-Array";
import { sleep } from "../../../../Components/Helpers/Sleep";
import TimeTable from "../../../../Components/UI/PageComponents/AlgoPageTemplate/TimeTable";

export default function TimSort() {
  const [displayArray, setDisplayArray] = useState(getRandomArray());
  const [sorting, setSorting] = useState(false);
  const sortRef = useRef<boolean>();
  sortRef.current = sorting;

  //for speed of visual sorting
  const [currSpeed, setCurrSpeed] = useState(50);
  const speedRef = useRef<number>();
  speedRef.current = currSpeed; //allows for use of state in async function

  // inplace insertion sort
  // replace left with 0 and right with length-1 for normal insertion sort
  const insertionSort = async (
    sortArray: number[],
    left: number,
    right: number
  ) => {
    for (let i = left + 1; i <= right; i++) {
      const pivot = sortArray[i];
      let j = i - 1;
      while (j >= left && sortArray[j] > pivot) {
        //swaps values descending until sorted
        // you always know the location of the index to compare to so there is no need for a temp index
        sortArray[j + 1] = sortArray[j];
        j--;

        await sleep(speedRef.current);
        setDisplayArray(sortArray.concat([]));
      }
      sortArray[j + 1] = pivot;
    }
  };

  // Merging two array sections logic
  const merge = (
    MergeArray: number[],
    leftIndex: number,
    middleIndex: number,
    rightIndex: number
  ) => {
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
  };

  const timSort = async (sortArray: number[]) => {
    const RUN = 10; // normaly this would be 64 but that is very large for our data set, might be nice for this to be user controled
    const len = sortArray.length;
    for (let i = 0; i < len; i += RUN) {
      await insertionSort(sortArray, i, Math.min(i + RUN - 1, len - 1));

      await sleep(speedRef.current);
      setDisplayArray(sortArray.concat([]));
    }
    // merge blocks together
    for (let size = RUN; size < len; size *= 2) {
      for (let left = 0; left < len; left += 2 * size) {
        const mid = left + size - 1;
        const right = Math.min(left + 2 * size - 1, len - 1);
        merge(sortArray, left, mid, right);

        await sleep(speedRef.current);
        setDisplayArray(sortArray.concat([]));
      }
    }
    setDisplayArray(sortArray.concat([]));
    setSorting(false);
    return sortArray;
  };

  //handlers
  const buttonHandlerReset = () => {
    if (!sorting) {
      setDisplayArray(getRandomArray());
    }
    if (sorting) {
      setSorting(false);
    }
  };

  const buttonHandlerSort = () => {
    if (!sorting) {
      setSorting(true);
      setTimeout(() => {
        timSort(displayArray);
      }, 250);
    }
  };

  //page info -------------------------------------------------------------------
  const pageTitle = "TimSort()";
  const algo = <ArrayVisualizer newArray={displayArray} />;
  const buttons = (
    <React.Fragment>
      <Button onClick={buttonHandlerSort}>Sort</Button>
      <Button onClick={buttonHandlerReset}>
        {sorting ? "Pause" : "Reset"}
      </Button>
      <Speedometer currSpeed={currSpeed} setSpeed={setCurrSpeed} />
    </React.Fragment>
  );

  const algoText = `  
      const timSort = (sortArray: number[]) => {^
      const RUN = 10    // normaly this would be 64 but that is very large for our data set^
      const len = sortArray.length;^
      for (let i = 0; i < len; i += RUN) {^
          insertionSort(sortArray, i, Math.min(i + RUN - 1, len - 1));^
      }^
      // merge blocks together^
      for (let size = RUN; size < len; size *= 2) {^
          for (let left = 0; left < len; left += 2 * size) {^
              const mid = left + size - 1;^
              const right = Math.min(left + 2 * size - 1, len - 1);^
              merge(sortArray, left, mid, right);^
          }^
      }^
      return sortArray;^
  }^
  `;

  const insertText = `
  // inplace insertion sort^
  // replace left with 0 and right with length-1 for normal insertion sort^^
  const insertionSort = (sortArray: number[], left: number, right: number) => {^
    for (let i = left + 1; i <= right; i++) {^
        const pivot = sortArray[i];^
        let j = i - 1;^
        while (j >= left && sortArray[j] > pivot) {^
            //swaps values descending until sorted^
            sortArray[j + 1] = sortArray[j];^
            j--;^
        }^
        sortArray[j + 1] = pivot;^
    }^
};^
  `;

  const mergeText = `  
  // Merging two array sections logic^
  const merge = (MergeArray: number[],leftIndex: number, middleIndex:number, rightIndex: number) => {^
      if (middleIndex >= rightIndex) {^
          return;^
      }^
      const leftLen = middleIndex - leftIndex + 1;^
      const RightLen = rightIndex - middleIndex;^
      const leftArray = [];^
      const rightArray = [];^
^
      // initalize the sides / make the two arrays to merge^
      for (let i = 0; i < leftLen; i++) {^
          leftArray[i] = MergeArray[leftIndex + i];^
      }^
      for (let i = 0; i < RightLen; i++) {^
          rightArray[i] = MergeArray[middleIndex + 1 + i];^
      }^
^
      // i,j,k merge logic^
      let i = 0;^
      let j = 0;^
      let k = leftIndex;^
      while (i < leftArray.length && j < rightArray.length) {^
          if (leftArray[i] < rightArray[j]) {^
              MergeArray[k++] = leftArray[i++];^
          } else {^
              MergeArray[k++] = rightArray[j++];^
          }^
      }^
      // clean up unequal sizes, may or may not happen depending on run size^
      while (i < leftArray.length) {^
          MergeArray[k++] = leftArray[i++];^
      }^
      while (j < rightArray.length) {^
          MergeArray[k++] = rightArray[j++];^
      }^
  }^
  `;

  return (
    <AlgoPageTemplate algo={algo} title={pageTitle} buttonContainer={buttons}>
      <H centered={true}>TimSort Overview</H>
      <P>
        TimSort is a sorting algorithm that was introduced in 2002 by Tim
        Peters, a software developer at Python Software Foundation. TimSort is a
        hybrid sorting algorithm that combines elements of{" "}
        <RefLink to="/insertionsort">insertion sort</RefLink> and{" "}
        <RefLink to="/mergesort">merge sort</RefLink> to achieve a fast, stable,
        and efficient sorting algorithm. The algorithm works by first dividing
        the input list into small sub-lists, sorting them using insertion sort,
        and then merging the sorted sub-lists using merge sort. One of the key
        advantages of TimSort is that it is able to take advantage of any
        preexisting order in the input list, making it an ideal choice for
        sorting partially ordered lists.
      </P>

      <P>
        To understand TimSort, imagine that you have a deck of cards that you
        want to sort. You could start by dividing the deck into small piles,
        each containing a few cards. Next, you could sort each pile individually
        using insertion sort, which is a simple sorting algorithm that works
        well for small lists. Finally, you could merge the sorted piles back
        together using merge sort, which is a more sophisticated algorithm that
        can efficiently merge two sorted lists into one sorted list. By
        combining these two algorithms, TimSort is able to achieve a faster and
        more efficient sorting algorithm than using either algorithm alone.
        Additionally, TimSort is stable, meaning that it preserves the relative
        order of equal elements in the input list, making it ideal for
        applications where maintaining the original order of equal elements is
        important.
      </P>

      <H>TimSort - TimSort() Implementation (TS)</H>
      <CodeSnippet>{algoText}</CodeSnippet>

      <H>TimSort - InsertionSort() Implementation (TS)</H>
      <CodeSnippet>{insertText}</CodeSnippet>

      <H>TimSort - Merge() Implementation (TS)</H>
      <CodeSnippet>{mergeText}</CodeSnippet>

      <H>Time Complexity</H>
      <TimeTable best={"O(n)"} average={"O(n log(n))"} worst={"O(n log(n))"} />
      <P>
        The time complexity of TimSort is O(n log n) in the worst case scenario,
        where n is the number of elements in the input list. This means that the
        algorithm takes roughly proportional to n times the logarithm of n
        operations to sort the list. However, in practice, the time complexity
        of TimSort is often closer to O(n) for partially ordered or nearly
        sorted lists, as the algorithm is able to take advantage of any
        preexisting order in the input list to reduce the number of comparisons
        and swaps required. Overall, TimSort is an efficient and effective
        sorting algorithm that is widely used in many programming languages and
        applications.
      </P>
    </AlgoPageTemplate>
  );
}
