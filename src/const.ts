import type { FormErrorsValues } from "./types";

export const Materials = {
	wood: 'Дерево',
	plastic: 'Пластик',
	metall: 'Meталл',
} as const;

export const FormFields = {
	material: 'Материал',
	quantity: 'Количество',
	username: 'Ваше имя',
} as const;

export const VALIDATION = {
	REQUIRED: 'Поле обязательно для заполнения',
	ONLY_NUMBERS: 'Можно ввести только числа',
	POSITIVE_NUMBER: 'Количество должно быть больше нуля',
	SERVER_ERROR: 'Сервис временно недоступен, мы уже чиним',
} as const;

export const HINT_VALIDATION_MESSAGES: FormErrorsValues[] = [VALIDATION.ONLY_NUMBERS];
