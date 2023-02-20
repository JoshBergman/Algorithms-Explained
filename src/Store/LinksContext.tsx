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
    links: [string, string, string][];
    //? [name, link, desc]
}

export const LinksProvider = ({children}:IProviderProps) => {

    const currLinks: Links = {
        links: [
            ["Test", "/test", "Pathfinding"],
            ["Name 2", "/test", "Sorting"], 
            ["Array", "/array", "Data Structure"], 
            ["Another Link", "/test", "Optimization"], 
            ["Sml Lnk", "/test", "Measuring"], 
            ["Go Home", "/", "Return Link"],
            ["Example Page", "/example", "Example"]
    ]
    };

    const featuredLinks: Links = {
        links: [
            currLinks.links[2], //Array (dev)
            currLinks.links[4], //Test (dev)
            ["Array", "/array", "Data Structure"], 
            ["Another Link", "/test", "Optimization"], 
            ["Sml Lnk", "/test", "Measuring"], 
            ["See More...", "/algorithms", ""],
            currLinks.links[6],
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