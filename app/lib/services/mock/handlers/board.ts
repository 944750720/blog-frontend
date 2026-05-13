import { HttpResponse, http } from "msw";
import { BASE } from "../constants";
import { mockBoard, mockBoardComment } from "../data";

export const boardHandlers = [
	http.get(`${BASE}/api/v1/board`, () => {
		return HttpResponse.json(mockBoard);
	}),

	http.get(`${BASE}/api/v1/board-comments`, ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page") ?? 1);
		const limit = Number(url.searchParams.get("limit") ?? 20);
		return HttpResponse.json({
			data: [mockBoardComment],
			total: 1,
			page,
			limit,
			totalPages: 1,
		});
	}),

	http.post(`${BASE}/api/v1/board-comments`, async ({ request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json(
			{ ...mockBoardComment, ...body, comment_id: 2 },
			{ status: 201 },
		);
	}),

	http.put(`${BASE}/api/v1/board-comments/:id`, async ({ params, request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json({
			...mockBoardComment,
			...body,
			comment_id: Number(params.id),
		});
	}),

	http.delete(`${BASE}/api/v1/board-comments/:id`, () => {
		return new HttpResponse(null, { status: 204 });
	}),
];
