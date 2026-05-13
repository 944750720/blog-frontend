import { HttpResponse, http } from "msw";
import { BASE } from "../constants";
import { mockTag, mockTags } from "../data";

export const tagHandlers = [
	http.get(`${BASE}/api/v1/tags`, ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page") ?? 1);
		const limit = Number(url.searchParams.get("limit") ?? 50);
		return HttpResponse.json({
			data: mockTags,
			total: mockTags.length,
			page,
			limit,
			totalPages: 1,
		});
	}),

	http.get(`${BASE}/api/v1/tags/:slug`, ({ params }) => {
		return HttpResponse.json({ ...mockTag, slug: params.slug });
	}),

	http.post(`${BASE}/api/v1/tags`, async ({ request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json(
			{ ...mockTag, ...body, tag_id: 4 },
			{ status: 201 },
		);
	}),

	http.put(`${BASE}/api/v1/tags/:id`, async ({ params, request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json({
			...mockTag,
			...body,
			tag_id: Number(params.id),
		});
	}),

	http.delete(`${BASE}/api/v1/tags/:id`, () => {
		return new HttpResponse(null, { status: 204 });
	}),

	// Blog-Tag relations
	http.post(`${BASE}/api/v1/blog-tags`, async ({ request }) => {
		const body = (await request.json()) as { blog_id: number; tag_id: number };
		return HttpResponse.json(body, { status: 201 });
	}),

	http.delete(`${BASE}/api/v1/blog-tags/:blogId/:tagId`, () => {
		return new HttpResponse(null, { status: 204 });
	}),
];
