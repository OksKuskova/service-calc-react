import { useCallback, useState, type JSX } from "react";

import FormField from "../form/form-field";
import FormButton from "../form/form-button";
import DiscountTimer from "./discount-timer";
import Summary from "./summary";

import { START_DISCOUNT_VALUE } from "./totals.const";
import { useCalcContext } from "../../context";

function Totals(): JSX.Element {
	const { formErrors } = useCalcContext();

	const [discountPercent, setDiscountPercent] = useState<number>(START_DISCOUNT_VALUE);

	const handleDiscountChange = useCallback((newDiscount: number) => {
		setDiscountPercent(newDiscount);
	}, []);

	return (
		<div className="calc__totals">
			<DiscountTimer discountPercent={discountPercent} onDiscountChange={handleDiscountChange} />

			<Summary discountPercent={discountPercent} />

			<FormField error={formErrors.order}>
				<FormButton />
			</FormField>

		</div>
	)
}

export default Totals;