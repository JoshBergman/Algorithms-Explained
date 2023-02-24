import { sharedPallette } from "./SharedPalette";
import { IPalette, toStyleObj } from "./ThemeInterface";

export const DarkPalette: IPalette = {
    ...sharedPallette,
    pageColor: toStyleObj(false, "#121212"),
    background1: toStyleObj(false, "black"),
    text1: toStyleObj(true, "#D0D3D4"),
};

/*
Undecided colors:

text1: 
 brighter: #ECF0F1
 darker: #D0D3D4

*/