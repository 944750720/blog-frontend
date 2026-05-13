import { HttpResponse, http } from "msw";
import { BASE } from "../constants";
import { mockUser } from "../data";

export const userHandlers = [
	http.get(`${BASE}/api/v1/users`, ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page") ?? 1);
		const limit = Number(url.searchParams.get("limit") ?? 10);
		return HttpResponse.json({
			data: [mockUser],
			total: 1,
			page,
			limit,
			totalPages: 1,
		});
	}),

	http.get(`${BASE}/api/v1/users/:id`, ({ params }) => {
		return HttpResponse.json({ ...mockUser, user_id: Number(params.id) });
	}),

	http.post(`${BASE}/api/v1/users`, async ({ request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json(
			{ ...mockUser, ...body, user_id: 2 },
			{ status: 201 },
		);
	}),

	http.put(`${BASE}/api/v1/users/:id`, async ({ params, request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json({
			...mockUser,
			...body,
			user_id: Number(params.id),
		});
	}),

	http.delete(`${BASE}/api/v1/users/:id`, () => {
		return new HttpResponse(null, { status: 204 });
	}),
];
