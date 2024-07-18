import TextInput from "@/components/Inputs/TextInput";
import TextInputWithUnits from "@/components/Inputs/TextInputWithUnits";

export default function AddIngredient({}){
    return(
        <div className={`w-full flex flex-col gap-4`}>
          <TextInput placeholder="Name" />
          <TextInputWithUnits placeholder="Density" units="g cm-3" />
          "Purchased in" dropdown... + probably remove density?
        </div>
    );
}