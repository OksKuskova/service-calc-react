import type { JSX, SelectHTMLAttributes } from "react";
import type { Material } from "../../types";

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
	materials: Material[];
}

function FormSelect(props: FormSelectProps): JSX.Element {
	const { materials } = props;
	return (
		<div className="calc__select-wrapper">
			<select
				className="calc__select form-element"
				{...props}
			>
				{materials.length > 0
					? materials.map(({ name }) => <option value={name} key={name}>{name}</option>)
					: <option disabled selected>Нет доступных материалов</option>}
			</select>
		</div>
	)
}

export default FormSelect;