import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import { FaRegTrashCan } from "react-icons/fa6";
import { ChangeEvent, useEffect, useState } from "react";
import { MeasurementState } from "@/app/ingredients/sub-pages/AddIngredient";
import { title } from "process";

type Props = {
    setMeasurements: Function,
    id: number,
    titleError: string,
    gramsError: string,
    setTitleError: Function,
    setGramsError: Function
}

export default function AddMeasurement( {setMeasurements, id, titleError, gramsError, setTitleError, setGramsError }: Props){



    return(
        <div className={`rounded-lg bg-white border py-8 px-6 w-full flex flex-col gap-8 relative`}>
            <div className={`absolute right-6 top-5 hover:opacity-50 cursor-pointer transition-opacity`}>
                <FaRegTrashCan onClick={()=>{
                    setMeasurements((prev : MeasurementState[])=>{
                        let arrayIndex;
                        for(let i = 0; i<prev.length; i++){
                            if(prev[i].id === id){
                                arrayIndex = i;
                            }
                        }
                        if(typeof arrayIndex === 'number'){
                            prev.splice(arrayIndex, 1)
                        }
                        return [...prev]
                    });
                }} style={{color:"#C30000"}} size={20} />
            </div>
            <div className={`flex flex-col w-full gap-2`}>
                <h2 className={`text-green-dark`}>Measurement Name:</h2>
                <TextInput onChange={(e : ChangeEvent)=>{
                    setTitleError('');
                    setMeasurements((prev : MeasurementState[])=>{
                        let arrayIndex;
                        for(let i = 0; i<prev.length; i++){
                            if(prev[i].id === id){
                                arrayIndex = i;
                            }
                        }
                        if(typeof arrayIndex === 'number'){
                            prev[arrayIndex] = {
                                ...prev[arrayIndex],
                                title: (e.target as HTMLInputElement).value,
                            }
                        }
                        return [...prev]
                    });
                }} 
                error={titleError}
                placeholder="Eg: 1L carton" />
            </div>
            <div className={`flex flex-col w-full gap-2`}>
                <h2 className={`text-green-dark`}>Weight of this measurement in grams:</h2>
                <NumberInput 
                    error={gramsError}
                    setError={setGramsError}
                    onChange={(e : ChangeEvent)=>{
                        setMeasurements((prev : MeasurementState[])=>{
                            setGramsError('');
                            let arrayIndex;
                            for(let i = 0; i<prev.length; i++){
                                if(prev[i].id === id){
                                    arrayIndex = i;
                                }
                            }
                            if(typeof arrayIndex === 'number'){
                                prev[arrayIndex] = {
                                    ...prev[arrayIndex],
                                    grams: (e.target as HTMLInputElement).value,
                                }
                            }
                            return [...prev]
                        });
                    }} 
                    units="grams" 
                    placeholder="Eg: 1000" 
                />
            </div>
        </div>
    );
}