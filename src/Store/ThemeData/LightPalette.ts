import { IPalette, toStyleObj } from "./ThemeInterface";
import { sharedPallette } from "./SharedPalette";

export const LightPalette: IPalette = {
    ...sharedPallette,
    pageColor: toStyleObj(false, "#F2F3F4"),
    background1: toStyleObj(false, "white"),
    text1: toStyleObj(true, "black"),
};