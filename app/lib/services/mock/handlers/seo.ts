import { HttpResponse, http } from "msw";
import { BASE } from "../constants";
import { mockSeo } from "../data";

export const seoHandlers = [
	http.get(`${BASE}/api/v1/seo`, ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page") ?? 1);
		const limit = Number(url.searchParams.get("limit") ?? 10);
		return HttpResponse.json({
			data: [mockSeo],
			total: 1,
			page,
			limit,
			totalPages: 1,
		});
	}),

	http.get(`${BASE}/api/v1/seo/:id`, ({ params }) => {
		return HttpResponse.json({ ...mockSeo, seo_id: Number(params.id) });
	}),

	http.post(`${BASE}/api/v1/seo`, async ({ request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json(
			{ ...mockSeo, ...body, seo_id: 2 },
			{ status: 201 },
		);
	}),

	http.put(`${BASE}/api/v1/seo/:id`, async ({ params, request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json({
			...mockSeo,
			...body,
			seo_id: Number(params.id),
		});
	}),

	http.delete(`${BASE}/api/v1/seo/:id`, () => {
		return new HttpResponse(null, { status: 204 });
	}),
];
