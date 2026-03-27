import { createContext, useContext, useState, type ReactNode } from "react";

type FormDataType = {
	material: string,
	quantity: string,
	username: string,
}

type CalcContextType = {
	formData: FormDataType,
	setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
}

const CalcContext = createContext<CalcContextType | null>(null);

export function CalcProvider({ children }: { children: ReactNode }) {
	const [formData, setFormData] = useState<FormDataType>({
		material: '',
		quantity: '',
		username: '',
	});

	return (
		<CalcContext.Provider value={{ formData, setFormData }}>
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