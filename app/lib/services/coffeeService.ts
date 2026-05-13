import type { Coffee, CreateCoffee, Currency } from "../../types/coffee";
import type { CoffeeQueryParams, PaginatedResponse } from "../../types/common";
import httpClient from "../http/client";

// Preset amounts per currency
export const PRESET_AMOUNTS: Record<Currency, number[]> = {
	CNY: [10, 30],
	JPY: [200, 500],
	USD: [2, 5],
};

export async function getCoffees(
	params?: CoffeeQueryParams,
): Promise<PaginatedResponse<Coffee>> {
	const query = new URLSearchParams();
	if (params?.page) query.set("page", String(params.page));
	if (params?.limit) query.set("limit", String(params.limit));
	if (params?.user_id) query.set("user_id", String(params.user_id));
	if (params?.currency) query.set("currency", params.currency);
	if (params?.status) query.set("status", params.status);

	const response = await httpClient.get(`/api/v1/coffees?${query.toString()}`);
	return response.data;
}

export async function createCoffee(data: CreateCoffee): Promise<Coffee> {
	const response = await httpClient.post("/api/v1/coffees", data);
	return response.data;
}

export async function getCoffeeStats() {
	const response = await httpClient.get("/api/v1/coffees/stats");
	return response.data;
}
