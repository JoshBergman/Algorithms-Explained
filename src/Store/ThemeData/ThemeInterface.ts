interface IStyleObj {
    color?: string;
    backgroundColor?: string;
}

export interface IPalette {
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