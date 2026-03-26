import type { JSX } from "react";

function Form(): JSX.Element {
	return (
		<form className="calc__form" id="order" data-js-form noValidate>
			<div className="calc__field">
				<label className="calc__label" htmlFor="material">Материал</label>
				<div className="calc__select-wrapper" data-js-select-wrapper>
					<select className="calc__select form-element" name="material" id="material" required data-js-select></select>
				</div>
			</div>
			<div className="calc__field">
				<label className="calc__label" htmlFor="quantity">Количество</label>
				<input className="calc__input form-element" type="text" id="quantity" name="quantity" autoComplete="off" required />
			</div>
			<div className="calc__field">
				<label className="calc__label" htmlFor="name">Ваше имя</label>
				<input className="calc__input form-element" type="text" id="name" name="name" autoComplete="off" required />
			</div>
		</form>
	)
}

export default Form;