import React from 'react';

export const LinksContext = React.createContext({
    links: [["LinkTitle", "Endpoint"]]
});


//provider element 
interface IProviderProps {
    children: React.ReactNode;
}

interface Links {
    links: [string, string][];
}

export const LinksProvider = ({children}:IProviderProps) => {

    //if the quantity of links becomes more than we want on landing page make another list of 'featured links' for use on landing page
    const currLinks: Links = {
        links: [["Test", "/test"], ["Name 2", "/test"], ["Third s s s s s ", "/test"], ["Another Link", "/test"], ["Sml Lnk", "/test"]]
    };

    return (
        <LinksContext.Provider value={currLinks}>
            {children}
        </LinksContext.Provider>
    );
};