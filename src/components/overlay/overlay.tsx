import type { JSX } from "react";

function Overlay(): JSX.Element {
	return (
		<div className="calc__overlay overlay overlay--hidden" data-js-overlay>
			<span className="overlay__text" data-js-overlay-text>Загрузка...</span>
		</div>
	)
}

export default Overlay;