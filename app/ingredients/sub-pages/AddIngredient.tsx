"use client";
import TextInput from "@/components/Inputs/TextInput";
import RadioSet from "@/components/Inputs/RadioSet";
import { ChangeEvent, useState } from "react";
import AddMeasurement from "@/components/Inputs/AddMeasurement";
import Button from "@/components/Inputs/Button";
import IngredientType from "@/app/utils/types/IngredientType";
import MeasurementType from "@/app/utils/types/MeasurementType";

export type MeasurementState = {
  grams: string,
  title: string,
  id: number,
  purchasedIn: boolean,
  titleError: string,
  gramsError: string,
}

export default function AddIngredient({}){

  const defaultMeasurement = {
    grams: '',
    title: '',
    id: 0,
    purchasedIn: false,
    titleError: '',
    gramsError: ''
  }
  const [title, setTitle] = useState<string>('');
  const [measurements, setMeasurements] = useState<MeasurementState[]>([defaultMeasurement]);

  //Error states:
  const [titleError, setTitleError] = useState<string>('');
  const [purchasedInError, setPurchasedInError] = useState<string>('');
  const [noMeasurementsError, setNoMeasurementsError] = useState<string>('');

  //construct ratio options from measurements:
  let options = [];
  let purchasedInId;
  for(let i = 0; i<measurements.length; i++){
    if(measurements[i].purchasedIn){
      purchasedInId = measurements[i].id;
    }
    options.push({
      text: measurements[i].title,
      value: `${measurements[i].id}`
    });
  }

  //decide whether to display options:
  let displayOptions = false;
  for(let i = 0; i<options.length; i++){
    if(options[i].text.length > 0){
      displayOptions = true;
      break;
    }
  }

  function submitHandler(){
    let errorFound = false;
    //Check the ingredient has a title:
    if(title.length < 1){
      errorFound = true;
      setTitleError('Please enter a valid ingredient name.');
    }

    //Check the ingredient measurement entries are complete:
    if(measurements.length === 0){
      errorFound = true;
      setNoMeasurementsError('Please enter at least one measurement.');
    }

    let newMeasurements = [...measurements];
    let measurementChangeMade = false;
    for(let i = 0; i<newMeasurements.length; i++){
      if(newMeasurements[i].title.length < 1){
        newMeasurements[i].titleError = 'Please enter a measurement title.'
        measurementChangeMade = true;
      }
      if(newMeasurements[i].grams.length < 1 || isNaN(Number(newMeasurements[i].grams))){
        newMeasurements[i].gramsError = 'Please enter a whole number of grams.'
        measurementChangeMade = true;
      }
    }
    if(measurementChangeMade){
      errorFound = true;
      setMeasurements(newMeasurements);
    }

    //Check that exactly one purchase option has been selected
    let purchasedInCounter = 0;
    for(let i = 0; i<measurements.length; i++){
      if(measurements[i].purchasedIn){
        purchasedInCounter++;
      }
    }
    if(purchasedInCounter !== 1){
      errorFound = true;
      setPurchasedInError('Please choose one measurement.');
    }

    if(errorFound){
      return;
    }

    //Submit ingredient:
        //HERE!!!
    
    /*const ingredient: IngredientType = {
      title: title,

    }*/


  }

  return(
      <div className={`w-full flex flex-col gap-10`}>

        <div className={`flex flex-col w-full gap-2`}>
          <h2 className={`font-bold text-green-dark`}>What is this ingredient called?</h2>
          <TextInput onChange={(e: ChangeEvent)=>{
              setTitle((e.target as HTMLInputElement).value);
              setTitleError('');
            }} 
            placeholder="Eg: Broccoli" 
            error={titleError}
          />
        </div>

        <div className={`flex flex-col w-full gap-2`}>
          <h2 className={`font-bold text-green-dark`}>What measurements does this ingredient come in?</h2>
          {measurements.map((measurement)=>{
            return(
              <div key={measurement.id}> 
                <AddMeasurement 
                  titleError={measurement.titleError} 
                  gramsError={measurement.gramsError} 
                  setTitleError={(newTitleError: string)=>{
                    let newMeasurements = [...measurements];
                    for(let i = 0; i<newMeasurements.length; i++){
                      if(newMeasurements[i].id === measurement.id){
                        newMeasurements[i].titleError = newTitleError;
                      }
                    }
                    setMeasurements(newMeasurements);
                  }}
                  setGramsError={(newGramsError: string)=>{
                    let newMeasurements = [...measurements];
                    for(let i = 0; i<newMeasurements.length; i++){
                      if(newMeasurements[i].id === measurement.id){
                        newMeasurements[i].gramsError = newGramsError;
                      }
                    }
                    setMeasurements(newMeasurements);
                  }}
                  setMeasurements={setMeasurements} 
                  id={measurement.id} 
                />
              </div>
            );
          })}
          {typeof noMeasurementsError === 'string' && noMeasurementsError.length > 0 && <p className={`text-red`}>{noMeasurementsError}</p>}
          <Button className={`mt-2 bg-white border border-green-dark`} onClick={()=>{
              setNoMeasurementsError('');
              let maxIndex =  -1;
              for(let i = 0; i<measurements.length; i++){
                if(maxIndex < measurements[i].id){
                  maxIndex = measurements[i].id
                }
              }
              let newMeasurements = [...measurements];
              newMeasurements.push({
                ...defaultMeasurement,
                id: maxIndex + 1,
              })
            setMeasurements(newMeasurements);
          }}>
            <p className={`whitespace-nowrap text-green-dark`}>+ Add Measurement</p>
          </Button>
        </div>
        {displayOptions && 
          <div className={`flex flex-col w-full gap-2`}>
            <h2 className={`font-bold text-green-dark`}>How is this ingredient purchased?</h2>
            <RadioSet error={purchasedInError} options={options} selected={`${purchasedInId}`} setSelected={(id: string)=>{
              let newMeasurements = [...measurements];
              setPurchasedInError('');
              for(let i=0; i<newMeasurements.length; i++){
                if(`${newMeasurements[i].id}` === id){
                  newMeasurements[i].purchasedIn = true;
                }else{
                  newMeasurements[i].purchasedIn = false;
                }
              }
              setMeasurements(newMeasurements);
            }} />
          </div>
        }
        <Button onClick={submitHandler}>
          <p className={`whitespace-nowrap text-green-dark`}>Save</p>
        </Button>
      </div>
  );
}