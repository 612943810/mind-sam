
import './Button.css';
import{ ReactNode} from 'react';
interface ButtonProps{
    text:ReactNode;
    clickAction?:()=>void;

}
export default function Button({text,clickAction}:ButtonProps){
    return(
        <>
    <button className='button' onClick={clickAction}>{text}</button>    
        </>
    )

}