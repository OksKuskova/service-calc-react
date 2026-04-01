import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { FormErrorsValues, Material, MaterialsValues, Order, Overlay } from "./types";
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
	order?: FormErrorsValues,
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
	costWithoutDiscount: number | null;
	overlay: Overlay;
	hideOverlay: () => void;
	showSuccess: () => void;
	setError: (error: keyof FormErrorsType, errorType: FormErrorsValues) => void,
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

	const [overlay, setOverlay] = useState<Overlay>({
		isVisible: true,
		type: null,
	});

	useEffect(() => {
		const loadMaterials = async () => {
			showLoading();
			try {
				const data = await calcApi.getMaterials();
				setMaterials(data);
			}
			catch (error: unknown) {
				console.error('Ошибка при загрузке материалов:', error);
			}
			finally {
				hideOverlay();
			}
		};

		loadMaterials();
	}, [])

	// Overlay

	const showLoading = useCallback(() => {
		setOverlay({ isVisible: true, type: 'loading' });
	}, []);

	const showSuccess = useCallback(() => {
		setOverlay({ isVisible: true, type: 'success' });
	}, []);

	const hideOverlay = useCallback(() => {
		setOverlay({ isVisible: false, type: null });
	}, []);

	// Валидация

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

	const setError = useCallback((field: keyof FormErrorsType, errorType: FormErrorsValues) => {
		setFormErrors((prev) => ({ ...prev, [field]: errorType }));
	}, [])

	const updateQuantityError = useCallback((originValue: string, cleanedValue: string) => {
		if (originValue !== cleanedValue && originValue !== '') {
			setError("quantity", VALIDATION.ONLY_NUMBERS);
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

	// Получаем данные формы для отправки на сервер

	const getOrderData = useCallback((): Order | null => {
		const quantity = formData.quantity;

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
	}, [formData]);

	// Расчет итоговой цены без скидки

	const isFormValid = useMemo(() => {
		const allFieldsFilled = !!formData.material && !!formData.quantity && Number(formData.quantity) !== 0;

		const noErrors = Object.keys(formErrors).length === 0;

		return allFieldsFilled && noErrors;
	}, [formData.material, formData.quantity, formErrors]);

	const selectedMaterial = useMemo(() => {
		if (!formData.material) return null;

		return materials.find((m) => m.name === formData.material);
	}, [materials, formData.material])

	const costWithoutDiscount = useMemo(() => {
		if (!isFormValid || !selectedMaterial) return null;

		return selectedMaterial.price * Number(formData.quantity);
	}, [isFormValid, selectedMaterial, formData.quantity]);

	return (
		<CalcContext.Provider
			value={
				{
					formData,
					setFormData,
					formErrors,
					clearError,
					updateQuantityError,
					validateFormOnSubmit,
					materials,
					getOrderData,
					costWithoutDiscount,
					overlay,
					hideOverlay,
					showSuccess,
					setError,
				}
			}
		>
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