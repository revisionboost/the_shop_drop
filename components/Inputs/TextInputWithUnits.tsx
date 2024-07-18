"use client";
import { ChangeEvent, useRef } from "react";
import TextInput from "./TextInput";

type Props = {
    placeholder: string,
    onChange?: (event: ChangeEvent) => void,
    units: string,
}

export default function TextInputWithUnitx({ placeholder, onChange, units } : Props){

    let unitsJsx = [];
    const unitStringArray = units.split('');
    for(let i = 0; i<unitStringArray.length; i++){
        if(unitStringArray[i] === '-' || /\d/.test(unitStringArray[i])){
            unitsJsx.push(<sup key={i}>{unitStringArray[i]}</sup>);
        }else{
            unitsJsx.push(<span key={i}>{unitStringArray[i]}</span>);
        }
    }

    const inputRef = useRef<HTMLInputElement>(null);

    return(
        <div onClick={()=>{
            inputRef.current?.focus();
        }} className={`flex items-center bg-gray-100 rounded-lg cursor-text`}>
            <TextInput ref={inputRef} onChange={onChange} placeholder={placeholder} />
            <span className={`whitespace-nowrap text-[#565656] px-6`}>{unitsJsx}</span>
        </div>
    );
}