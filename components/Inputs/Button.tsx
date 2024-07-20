import { ReactNode } from "react";
import { MouseEventHandler } from "react";

type Props = {
    children: ReactNode,
    className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

export default function Button({children, className, onClick}: Props){
    return(
        <button onClick={onClick} className={`hover:opacity-50 opacity-100 transition-opacity bg-green rounded-lg p-3 flex justify-center items-center ${className}`}>
            {children}
        </button>
    );
}