import type { OverlayType } from "./components/overlay/overlay.const";
import { FormFields, Materials, VALIDATION } from "./const"

type MaterialsKeys = keyof typeof Materials;
export type MaterialsValues = typeof Materials[MaterialsKeys];

export type Material = {
	name: MaterialsValues,
	price: number,
}

export type FormFieldsId = keyof typeof FormFields;
export type FormFieldsLabels = typeof FormFields[FormFieldsId];

export type FormErrorsValues = typeof VALIDATION[keyof typeof VALIDATION];

export type Order = {
	material: MaterialsValues,
	quantity: number,
	username: string,
}

type OverlayTypeValue = typeof OverlayType[keyof typeof OverlayType];

export type Overlay = {
	isVisible: boolean,
	type: OverlayTypeValue | null,
}
