import type { JSX } from "react";

function Totals(): JSX.Element {
	return (
		<div className="calc__totals">
			<div className="calc__discount summary">
				<span className="summary__label">Скидка (осталось секунд: <span data-js-timer></span>)</span>
				<span className="summary__value"><span data-js-discount></span>%</span>
			</div>

			<div className="calc__summary summary">
				<span className="summary__label">Итоговая стоимость</span>
				<span className="summary__value"><span data-js-summary></span> P</span>
			</div>

			<div className="calc__field">
				<button className="calc__button form-element form-element--green" type='submit' form="order"
					data-js-form-submit>Оформить заказ
				</button>
			</div>
		</div>
	)
}

export default Totals;