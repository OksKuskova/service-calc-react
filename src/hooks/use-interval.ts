import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number | null) {
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const callbackRef = useRef<() => void>(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback])

	useEffect(() => {
		if (delay === null) {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		} else {
			intervalRef.current = setInterval(callbackRef.current, delay);
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [delay]);
}