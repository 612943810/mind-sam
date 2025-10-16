
import { CSSProperties, ReactNode } from 'react';

interface ButtonProps{
    text: ReactNode;
    backgroundColor?: CSSProperties['backgroundColor'];
    color?: CSSProperties['color'];
    buttonType?: HTMLButtonElement['type'];
    clickAction?: () => void;
    submitAction?: () => void;
}

export default function Button({ text, backgroundColor, color, buttonType, clickAction, submitAction }: ButtonProps) {
    return (
        <button
            type={buttonType}
            className="px-4 py-2 rounded-md text-lg font-medium shadow-sm hover:shadow focus:outline-none"
            style={{ backgroundColor: backgroundColor, color: color }}
            onClick={clickAction}
            onSubmit={submitAction}
        >
            {text}
        </button>
    );
}