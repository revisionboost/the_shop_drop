import { ChangeEvent, Ref, forwardRef } from "react";

type Props = {
    placeholder: string,
    onChange?: (event: ChangeEvent) => void,
    value?: string | undefined, 
    type?: string,
    error?: string,
}

const TextInput = forwardRef<HTMLInputElement, Props>(({placeholder, onChange, value, type, error }: Props, ref: Ref<HTMLInputElement>)=>{
    return(
    <div className={`flex flex-col gap-1 w-full`}>
        <input value={value} ref={ref} onChange={onChange} type={type || 'text'} placeholder={placeholder} className={`bg-gray-100 p-3 rounded-lg w-full ${typeof error === 'string' && error.length > 0 ? 'border-2 border-red' : ''}`}>
            
        </input>
        {typeof error === 'string' && error.length > 0 && <p className={`text-red`}>{error}</p>}
    </div>
    );
});

export default TextInput;