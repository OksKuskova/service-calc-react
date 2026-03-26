import type { JSX } from "react";

import Form from "../form/form";
import Totals from "../totals/totals";

function Calculator(): JSX.Element {
	return (
		<div className="calc" data-js-calc>
			<Form />
			<Totals />
		</div>

	)
}

export default Calculator;