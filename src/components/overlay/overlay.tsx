import { useEffect, type JSX } from "react";
import { useCalcContext } from "../../context";
import { OVERLAY_DURATION, OverlayText } from "./overlay.const";

function Overlay(): JSX.Element | null {
	const { overlay, hideOverlay } = useCalcContext();

	const { isVisible, type } = overlay;

	const isSuccess = type === 'success';

	useEffect(() => {
		if (isVisible && isSuccess) {
			const timer = setTimeout(hideOverlay, OVERLAY_DURATION);

			return () => clearTimeout(timer);
		}
	}, [type, hideOverlay, isVisible]);

	if (!isVisible || type === null) {
		return null;
	};

	return (
		<div className='calc__overlay overlay'>
			<span className={`overlay__text ${isSuccess ? 'overlay__text--green' : ''}`}>{OverlayText[type]}</span>
		</div>
	)
}

export default Overlay;