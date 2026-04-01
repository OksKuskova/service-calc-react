import type { JSX } from "react";

import Form from "../form/form";
import Totals from "../totals/totals";
import Overlay from "../overlay/overlay";

import { CalcProvider } from "../../context";


function Calculator(): JSX.Element {
	return (
		<div className="calc">
			<CalcProvider>
				<Overlay />
				<Form />
				<Totals />
			</CalcProvider>
		</div>

	)
}

export default Calculator;