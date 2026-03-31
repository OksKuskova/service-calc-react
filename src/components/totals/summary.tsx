import type { JSX } from "react";
import { useCalcContext } from "../../context";

type SummaryProps = {
	discountPercent: number;
}

function Summary({ discountPercent }: SummaryProps): JSX.Element {
	const { costWithoutDiscount } = useCalcContext();

	const finalCost = costWithoutDiscount !== null ? costWithoutDiscount * (1 - discountPercent / 100) : null;

	return (
		<div className="calc__summary summary">
			<span className="summary__label">Итоговая стоимость</span>
			<span className="summary__value"><span>{finalCost !== null ? finalCost : '-'}</span> P</span>
		</div>
	)
}

export default Summary;