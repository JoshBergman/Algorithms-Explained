interface IStyleObj {
    color?: string;
    backgroundColor?: string;
}

export interface IPalette {
    pageColor: IStyleObj;
    logoText1: IStyleObj;
    logoBackground1: IStyleObj;
    mutedLogoText1: IStyleObj;
    mutedLogoBackground1: IStyleObj;
    background1: IStyleObj;
    text1: IStyleObj;
}

//helper function to easily create inline css objects
export const toStyleObj = (isText:boolean, color:string):IStyleObj => {
    if (isText){
        return {color : color}
    }
    else {
        return {backgroundColor : color}
    }
};