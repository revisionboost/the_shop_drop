import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { MdOutlineRadioButtonChecked } from "react-icons/md";

type Props = {
    options: Option[],
    selected: string, 
    setSelected: Function,
    error?: string
}

type Option = {
    text: string,
    value: string,
}

const iconSize = 20;

export default function RadioSet({ options, selected, setSelected, error }: Props){


    return(
        <div className={`flex flex-col gap-2`}>
            <div className={`flex flex flex-col gap-2`}>
                {
                    options.map((option, index)=>{
                        if(option.text.length < 1){
                            return '';
                        }
                        return(
                            <div key={index} onClick={()=>{
                                setSelected(option.value);
                            }} className={`flex items-center gap-2 cursor-pointer`}>
                                {selected === option.value ? 
                                    <MdOutlineRadioButtonChecked className={`text-green-dark`} size={iconSize} /> 
                                    :
                                    <MdOutlineRadioButtonUnchecked className={`text-green-dark`} size={iconSize} />
                                }
                                <p className="whitespace-nowrap text-green-dark" >{option.text}</p>
                            </div>
                        );
                    })
                }
            </div>
            {typeof error === 'string' && error.length > 0 && <p className={`text-red`}>{error}</p>}
        </div>
    );
}