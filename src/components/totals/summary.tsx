import type { JSX } from "react";

function Summary(): JSX.Element {
	return (
		<div className="calc__summary summary">
			<span className="summary__label">Итоговая стоимость</span>
			<span className="summary__value"><span data-js-summary></span> P</span>
		</div>
	)
}

export default Summary;