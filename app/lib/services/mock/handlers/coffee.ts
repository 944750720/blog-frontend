import { HttpResponse, http } from "msw";
import { BASE } from "../constants";
import { mockCoffee, mockCoffeeStats } from "../data";

export const coffeeHandlers = [
	http.get(`${BASE}/api/v1/coffees`, ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page") ?? 1);
		const limit = Number(url.searchParams.get("limit") ?? 10);
		return HttpResponse.json({
			data: [mockCoffee],
			total: 1,
			page,
			limit,
			totalPages: 1,
		});
	}),

	http.post(`${BASE}/api/v1/coffees`, async ({ request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json(
			{ ...mockCoffee, ...body, coffee_id: 2 },
			{ status: 201 },
		);
	}),

	http.get(`${BASE}/api/v1/coffees/stats`, () => {
		return HttpResponse.json(mockCoffeeStats);
	}),
];
