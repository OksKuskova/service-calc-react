import { useCallback, type ChangeEvent, type JSX, type SubmitEvent } from "react";

import FormField from "./form-field";
import FormSelect from "./form-select";
import FormInput from "./form-input";

import { FORM_ID } from "./form.const";
import { getMaterials } from "../../mock";
import { useCalcContext, type FormErrorsType } from "../../context";
import { cleanNotNumericValue } from "./form.utils";
import { VALIDATION } from "../../const";

function Form(): JSX.Element {
	const { formData, setFormData, formErrors, clearError, updateQuantityError, validateFormOnSubmit } = useCalcContext();

	const data = getMaterials();
	console.log('formData:', formData);
	console.log('formErrors:', formErrors);

	const handleFormSubmit = (evt: SubmitEvent<HTMLFormElement>) => {
		evt.preventDefault();
		const isValid = validateFormOnSubmit();
		console.log('isValid:', isValid);
	}

	const handleInputChange = useCallback((evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = evt.target;

		const errorField = name as keyof FormErrorsType;

		clearError(errorField);

		if (errorField === 'quantity') {
			const cleanedValue = cleanNotNumericValue(value);
			updateQuantityError(value, cleanedValue);

			setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	}, [clearError, cleanNotNumericValue, updateQuantityError]);

	const handleInputQuantityBlur = useCallback(() => {
		clearError('quantity', VALIDATION.ONLY_NUMBERS);
	}, [clearError]);

	return (
		<form className="calc__form" id={FORM_ID} noValidate onSubmit={handleFormSubmit}>
			<FormField label="Материал" elementId="material" error={formErrors.material}>
				<FormSelect name="material" value={formData.material} materials={data} onChange={handleInputChange} />
			</FormField>

			<FormField label="Количество" elementId="quantity" error={formErrors.quantity}>
				<FormInput type="text" id="quantity" name="quantity" value={formData.quantity} autoComplete="off" required onChange={handleInputChange} onBlur={handleInputQuantityBlur} />
			</FormField>

			<FormField label="Ваше имя" elementId="username" error={formErrors.username}>
				<FormInput type="text" id="username" name="username" value={formData.username} autoComplete="off" required onChange={handleInputChange} />
			</FormField>
		</form>
	)
}

export default Form;