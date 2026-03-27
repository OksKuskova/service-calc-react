import type { JSX, SelectHTMLAttributes } from "react";
import type { Material } from "../../types";

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
	materials: Material[];
}

function FormSelect(props: FormSelectProps): JSX.Element {
	const { materials, ...rest } = props;

	const hasOptions = materials.length > 0;

	return (
		<div className="calc__select-wrapper">
			<select
				className="calc__select form-element"
				{...rest}
			>
				<option value="" disabled >{hasOptions ? 'Выберите материал' : 'Нет доступных материалов'}</option>
				{hasOptions && materials.map(({ name }) => <option value={name} key={name}>{name}</option>)}
			</select>
		</div>
	)
}

export default FormSelect;