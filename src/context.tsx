import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { FormErrorsValues, Material, MaterialsValues, Order } from "./types";
import { VALIDATION } from "./const";
import { calcApi } from "./api/api";

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
	materials: Material[],
	formData: FormDataType,
	setFormData: React.Dispatch<React.SetStateAction<FormDataType>>,
	formErrors: FormErrorsType,
	clearError: (error: keyof FormErrorsType, errorType?: FormErrorsValues) => void,
	updateQuantityError: (originValue: string, cleanedValue: string) => void,
	validateFormOnSubmit: () => boolean;
	getOrderData: () => Order | null;
}

const CalcContext = createContext<CalcContextType | null>(null);

export function CalcProvider({ children }: { children: ReactNode }) {
	const [materials, setMaterials] = useState<Material[]>([]);

	const [formData, setFormData] = useState<FormDataType>({
		material: '',
		quantity: '',
		username: '',
	});

	const [formErrors, setFormErrors] = useState<FormErrorsType>({});

	useEffect(() => {
		const loadMaterials = async () => {
			try {
				const data = await calcApi.getMaterials();
				setMaterials(data);
			} catch (error: unknown) {
				console.error('Ошибка при загрузке материалов:', error);
			}
		};

		loadMaterials();
	}, [])

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

	const getOrderData = (): Order | null => {
		const quantity = formData.quantity.trim();

		if (!formData.material || !quantity || !formData.username.trim()) {
			return null;
		}

		const numberQuantity = Number(quantity);

		if (numberQuantity <= 0) {
			return null;
		}

		return {
			material: formData.material as MaterialsValues,
			quantity: numberQuantity,
			username: formData.username.trim(),
		}
	}


	return (
		<CalcContext.Provider value={{ formData, setFormData, formErrors, clearError, updateQuantityError, validateFormOnSubmit, materials, getOrderData }}>
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