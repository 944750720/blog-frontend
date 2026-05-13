import { HttpResponse, http } from "msw";
import { BASE } from "../constants";
import { mockSection, mockSections } from "../data";

export const sectionHandlers = [
	http.get(`${BASE}/api/v1/sections`, ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page") ?? 1);
		const limit = Number(url.searchParams.get("limit") ?? 50);
		return HttpResponse.json({
			data: mockSections,
			total: mockSections.length,
			page,
			limit,
			totalPages: 1,
		});
	}),

	http.get(`${BASE}/api/v1/sections/:slug`, ({ params }) => {
		return HttpResponse.json({ ...mockSection, slug: params.slug });
	}),

	http.post(`${BASE}/api/v1/sections`, async ({ request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json(
			{ ...mockSection, ...body, section_id: 3 },
			{ status: 201 },
		);
	}),

	http.put(`${BASE}/api/v1/sections/:id`, async ({ params, request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json({
			...mockSection,
			...body,
			section_id: Number(params.id),
		});
	}),

	http.delete(`${BASE}/api/v1/sections/:id`, () => {
		return new HttpResponse(null, { status: 204 });
	}),
];
