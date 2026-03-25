import type { JSX } from "react"

function App(): JSX.Element {
	return (
		<div className="calc" data-js-calc>
			<div className="calc__overlay overlay overlay--hidden" data-js-overlay>
				<span className="overlay__text" data-js-overlay-text>Загрузка...</span>
			</div>

			<form className="calc__form" id="order" data-js-form noValidate>
				<div className="calc__field">
					<label className="calc__label" htmlFor="material">Материал</label>
					<div className="calc__select-wrapper" data-js-select-wrapper>
						<select className="calc__select form-element" name="material" id="material" required data-js-select></select>
					</div>
				</div>
				<div className="calc__field">
					<label className="calc__label" htmlFor="quantity">Количество</label>
					<input className="calc__input form-element" type="text" id="quantity" name="quantity" autoComplete="off"
						required />
				</div>
				<div className="calc__field">
					<label className="calc__label" htmlFor="name">Ваше имя</label>
					<input className="calc__input form-element" type="text" id="name" name="name" autoComplete="off" required />
				</div>
			</form>

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
		</div>
	)
}

export default App
