import { ChangeEvent, Ref, forwardRef } from "react";

type Props = {
    placeholder: string,
    onChange?: (event: ChangeEvent) => void,
}

const TextInput = forwardRef<HTMLInputElement, Props>(({placeholder, onChange }: Props, ref: Ref<HTMLInputElement>)=>{
    return(
        <input ref={ref} onChange={onChange} type="text" placeholder={placeholder} className={`bg-gray-100 p-3 rounded-lg w-full`}>
            
        </input>
    );
});

export default TextInput;