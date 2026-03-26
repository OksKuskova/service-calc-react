import type { JSX, PropsWithChildren } from "react";
import type { FormFieldsId, FormFieldsLabels } from "../../types";

type FormFieldProps = PropsWithChildren & {
	label?: FormFieldsLabels,
	elementId?: FormFieldsId,
}

function FormField({ label, elementId, children }: FormFieldProps): JSX.Element {
	return (
		<div className="calc__field">
			{label && <label className="calc__label" htmlFor={elementId}>{label}</label>}
			{children}
		</div>
	)
}

export default FormField;