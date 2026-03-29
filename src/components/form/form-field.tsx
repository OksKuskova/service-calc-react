import type { JSX, PropsWithChildren } from "react";
import type { FormErrorsValues, FormFieldsId, FormFieldsLabels } from "../../types";
import { HINT_VALIDATION_MESSAGES } from "../../const";

type FormFieldProps = PropsWithChildren & {
	label?: FormFieldsLabels,
	elementId?: FormFieldsId,
	error?: FormErrorsValues,
}

function FormField({ label, elementId, error, children }: FormFieldProps): JSX.Element {
	return (
		<div className="calc__field">
			{label && <label className="calc__label" htmlFor={elementId}>{label}</label>}
			{children}
			{error && <span className={`calc__message ${HINT_VALIDATION_MESSAGES.includes(error) ? 'calc__message--hint' : 'calc__message--error'}`}>{error}</span>}
		</div>
	)
}

export default FormField;