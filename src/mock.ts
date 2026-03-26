import type { Material } from "./types";

const materials: Material[] = [
	{
		name: 'Дерево',
		price: 5000,
	},
	{
		name: 'Пластик',
		price: 123,
	},
	{
		name: 'Meталл',
		price: 1000,
	}
]

const getMaterials = () => materials;

export { getMaterials };