import { useState, useEffect, type JSX, useCallback } from "react";
import { START_TIMER_VALUE } from "./totals.const";
import { useInterval } from "../../hooks/use-interval";

type DiscountTimerProps = {
	discountPercent: number;
	onDiscountChange: (discount: number) => void;
}

function DiscountTimer({ discountPercent, onDiscountChange }: DiscountTimerProps): JSX.Element {
	const [secondsLeft, setSecondsLeft] = useState<number>(START_TIMER_VALUE);

	const tick = useCallback(() => {
		setSecondsLeft((prev) => Math.max(prev - 1, 0));
	}, [])

	useInterval(tick, secondsLeft > 0 ? 1000 : null);

	useEffect(() => {
		if (secondsLeft === 0) {
			onDiscountChange(0);
		}
	}, [secondsLeft, onDiscountChange]);

	return (
		<div className="calc__discount summary">
			<span className="summary__label">{`Скидка (осталось секунд: ${secondsLeft})`}</span>
			<span className="summary__value">{`${discountPercent}%`}</span>
		</div>
	)
}

export default DiscountTimer;