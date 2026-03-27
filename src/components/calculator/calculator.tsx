import type { JSX } from "react";

import Form from "../form/form";
import Totals from "../totals/totals";

import { CalcProvider } from "../../context";

function Calculator(): JSX.Element {
	return (
		<div className="calc" data-js-calc>
			<CalcProvider>
				<Form />
				<Totals />
			</CalcProvider>
		</div>

	)
}

export default Calculator;