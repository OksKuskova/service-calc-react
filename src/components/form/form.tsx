import type { JSX } from "react";

import FormField from "./form-field";
import FormSelect from "./form-select";
import FormInput from "./form-input";

import { FORM_ID } from "./form.const";
import { getMaterials } from "../../mock";

function Form(): JSX.Element {
	const data = getMaterials();

	return (
		<form className="calc__form" id={FORM_ID} noValidate>
			<FormField label="Материал" elementId="material">
				<FormSelect materials={data} />
			</FormField>

			<FormField label="Количество" elementId="quantity">
				<FormInput type="text" id="quantity" autoComplete="off" required />
			</FormField>

			<FormField label="Ваше имя" elementId="username">
				<FormInput type="text" id="username" autoComplete="off" required />
			</FormField>
		</form>
	)
}

export default Form;