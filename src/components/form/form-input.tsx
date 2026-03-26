import type { JSX, InputHTMLAttributes } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement>;

function FormInput(props: FormInputProps): JSX.Element {
	return (
		<input
			className="calc__input form-element"
			{...props}
		/>
	)
}

export default FormInput;