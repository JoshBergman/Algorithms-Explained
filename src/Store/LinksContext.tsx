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
    // [name, link, desc]
}

export const LinksProvider = ({children}:IProviderProps) => {

    //if the quantity of links becomes more than we want on landing page make another list of 'featured links' for use on landing page
    const currLinks: Links = {
        links: [["Test", "/test", "Pathfinding"], ["Name 2", "/test", "Sorting"], ["Array", "/array", "Data Structure"], ["Another Link", "/test", "Optimization"], ["Sml Lnk", "/test", "Measuring"], ["Go Home", "/", "Return Link"]]
    };

    const featuredLinks: Links = {
        links: [["Test", "/test", "Pathfinding"], ["Name 2", "/test", "Sorting"], ["Array", "/array", "Data Structure"], ["Another Link", "/test", "Optimization"], ["Sml Lnk", "/test", "Measuring"], ["See More...", "/algorithms", ""]]
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