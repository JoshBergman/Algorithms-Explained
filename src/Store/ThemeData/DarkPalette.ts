import { sharedPallette } from "./SharedPalette";
import { IPalette, toStyleObj } from "./ThemeInterface";

export const DarkPalette: IPalette = {
    ...sharedPallette,
    pageColor: toStyleObj(false, "#121212"),
    background1: toStyleObj(false, "black"),
    text1: toStyleObj(true, "white"),
};