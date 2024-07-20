import MeasurementType from "./MeasurementType";

type IngredientType = {
    title: string,
    id: number,
    measurements: MeasurementType[],
    purchasedIn: number
}

export default IngredientType;