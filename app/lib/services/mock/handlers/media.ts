import { HttpResponse, http } from "msw";
import { BASE } from "../constants";
import { mockMedia } from "../data";

export const mediaHandlers = [
	http.get(`${BASE}/api/v1/media`, ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page") ?? 1);
		const limit = Number(url.searchParams.get("limit") ?? 20);
		return HttpResponse.json({
			data: [mockMedia],
			total: 1,
			page,
			limit,
			totalPages: 1,
		});
	}),

	http.get(`${BASE}/api/v1/media/:id`, ({ params }) => {
		return HttpResponse.json({ ...mockMedia, media_id: Number(params.id) });
	}),

	http.post(`${BASE}/api/v1/media/upload`, () => {
		return HttpResponse.json({ ...mockMedia, media_id: 2 }, { status: 201 });
	}),

	http.delete(`${BASE}/api/v1/media/:id`, () => {
		return new HttpResponse(null, { status: 204 });
	}),
];
