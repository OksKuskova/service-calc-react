import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { FormErrorsValues } from "./types";
import { VALIDATION } from "./const";

type FormDataType = {
	material: string,
	quantity: string,
	username: string,
}

export type FormErrorsType = {
	material?: FormErrorsValues,
	quantity?: FormErrorsValues,
	username?: FormErrorsValues,
}

type CalcContextType = {
	formData: FormDataType,
	setFormData: React.Dispatch<React.SetStateAction<FormDataType>>,
	formErrors: FormErrorsType,
	clearError: (error: keyof FormErrorsType, errorType?: FormErrorsValues) => void,
	updateQuantityError: (originValue: string, cleanedValue: string) => void,
	validateFormOnSubmit: () => boolean;
}

const CalcContext = createContext<CalcContextType | null>(null);

export function CalcProvider({ children }: { children: ReactNode }) {
	const [formData, setFormData] = useState<FormDataType>({
		material: '',
		quantity: '',
		username: '',
	});

	const [formErrors, setFormErrors] = useState<FormErrorsType>({});

	const clearError = useCallback((field: keyof FormErrorsType, errorType?: FormErrorsValues) => {
		if (!errorType) {
			setFormErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			})
		} else {
			setFormErrors((prev) => {
				if (prev[field] === errorType) {
					const newErrors = { ...prev };
					delete newErrors[field];
					return newErrors;
				}
				return prev;
			})
		}
	}, []);

	const updateQuantityError = useCallback((originValue: string, cleanedValue: string) => {
		if (originValue !== cleanedValue && originValue !== '') {
			setFormErrors((prev) => ({ ...prev, quantity: VALIDATION.ONLY_NUMBERS }));
		} else {
			clearError("quantity", VALIDATION.ONLY_NUMBERS);
		}
	}, []);

	const validateFormOnSubmit = useCallback(() => {
		const newErrors: FormErrorsType = {};

		if (!formData.material) {
			newErrors.material = VALIDATION.REQUIRED;
		}

		if (!formData.quantity) {
			newErrors.quantity = VALIDATION.REQUIRED;
		} else if (Number(formData.quantity) <= 0) {
			newErrors.quantity = VALIDATION.POSITIVE_NUMBER;
		}

		if (!formData.username.trim()) {
			newErrors.username = VALIDATION.REQUIRED;
		}

		setFormErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	}, [formData]);


	return (
		<CalcContext.Provider value={{ formData, setFormData, formErrors, clearError, updateQuantityError, validateFormOnSubmit }}>
			{children}
		</CalcContext.Provider>
	);
}

export const useCalcContext = () => {
	const context = useContext(CalcContext);

	if (context === null) {
		throw new Error('Контекст равен null');
	}
	return context;
}