
import './Button.css';
import{ CSSProperties, ReactElement, ReactNode} from 'react';

interface ButtonProps{
     text:ReactNode;
    backgroundColor?:CSSProperties['backgroundColor'];
    color?:CSSProperties['color'];
    clickAction?:()=>void;

}
export default function Button({text,backgroundColor,color,clickAction}:ButtonProps){
    return(
        <>
    <button   className=" button" style={{backgroundColor:backgroundColor,color:color}} onClick={clickAction}>{text}</button>    
        </>
    )

}