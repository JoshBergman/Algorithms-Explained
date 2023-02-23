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
            ["Example Page", "/example", "Example", "Data-Structures/ExamplePage/ExamplePage.tsx"],
            ["FakeSort", "/fakesort", "Sorting", "Sorting/FakeSort/FakeSort.tsx"]
    ]
    };

    const featuredLinks: Links = {
        links: [
            currLinks.links[1],
            currLinks.links[0],
            currLinks.links[2],
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