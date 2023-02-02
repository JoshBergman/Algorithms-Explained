import React, { useState } from 'react';

import { IPalette } from './ThemeData/ThemeInterface';
import { LightPalette } from './ThemeData/LightPalette';
import { DarkPalette } from './ThemeData/DarkPalette';

//defining types and creating the context
export const StyleContext = React.createContext({
    isDark: false,
    toggleDark: () => {},
    theme: LightPalette
});


//provider element 
interface IProviderProps {
    children: React.ReactNode;
}

interface ITheme {
    isDark: boolean;
    toggleDark: () => void;
    theme: IPalette;
}

export const StyleProvider = ({children}:IProviderProps) => {
    const [isDark, setIsDark] = useState(false);

    const toggleDark = () => {
        setIsDark(prevDarkState => !prevDarkState);
    };


    const currTheme: ITheme = {
        toggleDark: toggleDark,
        isDark: isDark,
        theme: LightPalette
    }; 

    if(isDark){
        currTheme.theme = DarkPalette;
    }

    return (
        <StyleContext.Provider value={currTheme}>
            {children}
        </StyleContext.Provider>
    );
};