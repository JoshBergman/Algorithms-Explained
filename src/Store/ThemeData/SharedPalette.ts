import { toStyleObj } from "./ThemeInterface";

const logoColor = "#2ECC71";
const mutedLogoColor = "#229954";

export const sharedPallette = {
    logoText1: toStyleObj(true, logoColor),
    logoBackground1: toStyleObj(false, logoColor),
    mutedLogoText1: toStyleObj(true, mutedLogoColor), 
    mutedLogoBackground1: toStyleObj(false, mutedLogoColor),
};