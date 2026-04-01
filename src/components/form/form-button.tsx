import type { JSX } from "react";
import { FORM_ID } from "./form.const";
import { useCalcContext } from "../../context";

function FormButton(): JSX.Element {
	const { isSubmitting } = useCalcContext();

	return (
		<button className="calc__button form-element form-element--green" type='submit' form={FORM_ID} disabled={isSubmitting}>{isSubmitting ? 'Отправка формы ...' : 'Оформить заказ'}</button>
	)
}

export default FormButton;