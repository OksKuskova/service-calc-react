import type { JSX } from "react";
import { FORM_ID } from "./form.const";

function FormButton(): JSX.Element {
	return (
		<button className="calc__button form-element form-element--green" type='submit' form={FORM_ID}>Оформить заказ</button>
	)
}

export default FormButton;