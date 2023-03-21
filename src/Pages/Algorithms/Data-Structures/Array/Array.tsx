import React from 'react';
import AlgoPageTemplate from '../../../../Components/UI/PageComponents/AlgoPageTemplate/AlgoPageTemplate';

import ArrayDisplay from './ArrayDisplay';
import P from '../../../../Components/UI/PageComponents/AlgoPageTemplate/P';
import H from '../../../../Components/UI/PageComponents/AlgoPageTemplate/H';
import CodeSnippet from '../../../../Components/UI/PageResources/CodeSnippet/CodeSnippet';

export default function Array() {
  return (
    <AlgoPageTemplate algo={<ArrayDisplay />} title="Array">
        <H centered={true}>Array Fundamentals</H>
        <P>
          Arrays are a fundamental data structure in computer programming that allows you to store a collection of values in a single variable. 
          Think of an array as a box with multiple compartments, where each compartment can hold a single value. 
          These values can be of the same type, such as numbers or strings, or they can be a mix of different types. 
          You can access the values stored in an array by using an index, which is a numeric value that represents the position of the value within the array. 
          The first value in the array is always at index 0, the second value at index 1, and so on. 
          You can also modify the values stored in an array by assigning a new value to a specific index. 
          Arrays are incredibly versatile and are used in many programming languages to store and manipulate large amounts of data efficiently.
        </P>
        <P>
          When working with arrays, it's important to keep in mind that the size of the array, or the number of values it can hold, is fixed when it's created. 
          This means that you can't add or remove values from an array once it's been created, and attempting to do so can result in errors or unexpected behavior. 
          If you need to change the size of an array, you'll need to create a new array with the desired size and copy the values from the old array to the new one. 
          Additionally, arrays can be multidimensional, meaning they can have multiple rows and columns. 
          This allows you to represent more complex data structures, such as tables or matrices. 
          Understanding how arrays work is an essential part of becoming a proficient programmer, and mastering their use can help you write more efficient and elegant code.
        </P>

        <H>Array Implementation (TS)</H>
        <CodeSnippet>
          const exArray = ["String Value", 912, 0.12312, false, callBackPointer, functionExecution(), null];
        </CodeSnippet>

        <H>Array Allocation</H>
        <P>
        When you create an array in a programming language, the memory for that array is allocated from the computer's memory. 
        The amount of memory allocated for the array depends on the size of the array and the data type of the values it will hold. 
        For example, an array of 10 integers will require more memory than an array of 10 characters because integers typically require more memory to store than characters. 
        When the array is created, the memory is allocated in a contiguous block, which means that all the values in the array are stored in adjacent memory locations. 
        This makes it easy to access the values using an index, as each value is located at a fixed offset from the beginning of the array. 
        When the array is no longer needed, the memory allocated to it is freed up so that it can be used for other purposes. 
        Efficient allocation and management of memory is an important aspect of programming, as it can have a significant impact on the performance and stability of the program.
        </P>
    </AlgoPageTemplate>
  );
}