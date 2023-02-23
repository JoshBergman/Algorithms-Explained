import React, { useState } from 'react';
import AlgoPageTemplate from '../../../../Components/UI/PageComponents/AlgoPageTemplate/AlgoPageTemplate';

//Page element availablee
import P from '../../../../Components/UI/PageComponents/AlgoPageTemplate/P';
import H from '../../../../Components/UI/PageComponents/AlgoPageTemplate/H';
import CodeSnippet from '../../../../Components/UI/PageResources/CodeSnippet/CodeSnippet';

import ArrayVisualizer from '../../../../Components/Visualizers/ArrayVisualizer/ArrayVisualizer';
import { getRandomArray } from '../../../../Components/Helpers/Random-Array';

export default function Array() {
    const originalArray = getRandomArray();
    const [currArray, setCurrArray] = useState(originalArray);
    
    const pageTitle = "Fake Sort 4 Visualizer Testing";
    const algo = <ArrayVisualizer newArray={currArray} />
    //algo attribute is for the showcase, and is just a container for a custom component


    const buttonHandler = () => {
      const arrayCopy = currArray.concat([]);
      const sorted = arrayCopy.sort((a,b) => a-b);

      setCurrArray(sorted);
    };
    
    const buttonHandlerReset = () => {
      setCurrArray(getRandomArray());
    };


  return (
    <AlgoPageTemplate algo={algo} title={pageTitle}>
        <button onClick={buttonHandler}>Sort</button>
        <button onClick={buttonHandlerReset}>Reset</button>

        <H centered={true}>Hello With Centered Attribute Set To True!</H>
        <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
           sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
           Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
           Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.h
        </P>

        <CodeSnippet>
          Newlines are these^^
          const exArray = ["String Value", 912, 0.12312, 112];
        </CodeSnippet>

        <H>Hello, But No Centered Attribute</H>
        <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
           sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
           Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
           Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.h
        </P>
        
    </AlgoPageTemplate>
  );
}
