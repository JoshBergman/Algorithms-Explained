import React from 'react';

export const LinksContext = React.createContext({
    allLinks: {
        links: [["Title", "Endpoint", "Desc"]]
    },
    featuredLinks: {
        links: [["Title", "Endpoint", "Desc"]]
    }
});


//provider element 
interface IProviderProps {
    children: React.ReactNode;
}

interface Links {
    links: [string, string, string, string][];
    //? [name, link, desc, relative path]
    //? relative path is the path after /pages/alorithms | ex: "Data-Structures/Array/Array.tsx"
}

export const LinksProvider = ({children}:IProviderProps) => {

    const currLinks: Links = {
        links: [
            ["Array", "/array", "Data Structure", "Data-Structures/Array/Array.tsx"], 
            ["Bubble Sort", "/bubblesort", "Sorting", "Sorting/BubbleSort/BubbleSort.tsx"],
            ["Merge Sort", "/mergesort", "Sorting", "Sorting/MergeSort/MergeSort.tsx"],
            ["Insertion Sort", "/insertionsort", "Sorting", "Sorting/InsertionSort/InsertionSort.tsx"],
            ["Selection Sort", "/selectionsort", "Sorting", "Sorting/SelectionSort/SelectionSort.tsx"],
            ["TimSort", "/timsort", "Sorting", "Sorting/TimSort/TimSort.tsx"],
            ["QuickSort", "/quicksort", "Sorting", "Sorting/QuickSort/QuickSort.tsx"]
    ]
    };

    const featuredLinks: Links = {
        links: [
            ...currLinks.links
        ]
    }

    const links = {
        allLinks: currLinks,
        featuredLinks: featuredLinks
    };

    return (
        <LinksContext.Provider value={links}>
            {children}
        </LinksContext.Provider>
    );
};