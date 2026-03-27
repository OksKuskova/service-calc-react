import { useCallback, type ChangeEvent, type JSX } from "react";

import FormField from "./form-field";
import FormSelect from "./form-select";
import FormInput from "./form-input";

import { FORM_ID } from "./form.const";
import { getMaterials } from "../../mock";
import { useCalcContext } from "../../context";

function Form(): JSX.Element {
	const { formData, setFormData } = useCalcContext();
	const data = getMaterials();
	console.log('formData:', formData);

	const handleInputChange = useCallback((evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = evt.target;

		setFormData((prev) => ({ ...prev, [name]: value }));
	}, [setFormData]);

	return (
		<form className="calc__form" id={FORM_ID} noValidate>
			<FormField label="Материал" elementId="material">
				<FormSelect name="material" value={formData.material} materials={data} onChange={handleInputChange} />
			</FormField>

			<FormField label="Количество" elementId="quantity">
				<FormInput type="text" id="quantity" name="quantity" value={formData.quantity} autoComplete="off" required onChange={handleInputChange} />
			</FormField>

			<FormField label="Ваше имя" elementId="username">
				<FormInput type="text" id="username" name="username" value={formData.username} autoComplete="off" required onChange={handleInputChange} />
			</FormField>
		</form>
	)
}

export default Form;