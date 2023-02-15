import { sharedPallette } from "./SharedPalette";
import { IPalette, toStyleObj } from "./ThemeInterface";

export const DarkPalette: IPalette = {
    ...sharedPallette,
    pageColor: toStyleObj(false, "gray"),
    background1: toStyleObj(false, "black"),
    text1: toStyleObj(true, "white"),
};