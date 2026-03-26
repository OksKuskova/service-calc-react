import { FormFields, Materials } from "./const"

type MaterialsKeys = keyof typeof Materials;
type MaterialsValues = typeof Materials[MaterialsKeys];

export type Material = {
	name: MaterialsValues,
	price: number,
}

export type FormFieldsId = keyof typeof FormFields;
export type FormFieldsLabels = typeof FormFields[FormFieldsId];

