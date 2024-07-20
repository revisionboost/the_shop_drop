"use client";
import { ChangeEvent, useRef } from "react";
import TextInput from "./TextInput";

type Props = {
    placeholder: string,
    onChange?: (event: ChangeEvent) => void,
    units: string,
    error: string,
    setError: Function,
}

export default function NumberInput({ placeholder, onChange, units, error } : Props){

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

    function innerOnChange(e: ChangeEvent){             
        const target = e.target as HTMLInputElement;
        if(/\D/.test(target.value)){
            target.value = target.value.replace(/\D/g, '');
        }else if(typeof onChange !== 'undefined'){
            onChange(e);
        }
    }

    return(
        <div className={`flex flex-col gap-1`}>
            <div onClick={()=>{
                inputRef.current?.focus();
            }} className={`flex items-center bg-gray-100 rounded-lg cursor-text ${typeof error === 'string' && error.length > 0 ? 'border-2 border-red' : ''}`}>
                <TextInput ref={inputRef} onChange={innerOnChange} placeholder={placeholder} />
                <span className={`whitespace-nowrap text-[#565656] px-6`}>{unitsJsx}</span>
            </div>
            {typeof error === 'string' && error.length > 0 && <p className={`text-red`}>{error}</p>}
        </div>
    );
}