
import type { Material, Order } from "../types";
import { ApiEndpoints, BASE_URL, headers } from "./api.const";

const { Materials, Orders } = ApiEndpoints;

const handleResponse = async <T>(response: Response): Promise<T> => {
	if (!response.ok) {
		let message = `Ошибка ${response.status}: Не удалось выполнить запрос`;

		try {
			const errorData = await response.json();

			message = errorData?.message || errorData?.error || message;
		} catch { }
		throw new Error(message);
	}

	return response.json() as Promise<T>;
}

export const calcApi = {
	getMaterials: async (): Promise<Material[]> => {
		const response = await fetch(`${BASE_URL}${Materials}`);

		return handleResponse<Material[]>(response);
	},

	postOrder: async (order: Order) => {
		const response = await fetch(`${BASE_URL}${Orders}`, {
			method: 'POST',
			headers,
			body: JSON.stringify(order),
		});

		const fakeResponse = new Response(
			JSON.stringify({
				message: "Сервис временно недоступен, мы уже чиним"
			}),
			{
				status: 400,
				headers: {
					"Content-Type": "application/json"
				}
			}
		);

		const finalResponse = Math.random() <= 0.5 ? response : fakeResponse;

		return handleResponse(finalResponse);
	}
}

