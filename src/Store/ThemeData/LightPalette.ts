import { IPalette, toStyleObj } from "./ThemeInterface";
import { sharedPallette } from "./SharedPalette";

export const LightPalette: IPalette = {
    ...sharedPallette,
    pageColor: toStyleObj(false, "white"),
    background1: toStyleObj(false, "white"),
    text1: toStyleObj(true, "black"),
};