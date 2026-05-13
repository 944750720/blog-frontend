import { HttpResponse, http } from "msw";
import { BASE } from "../constants";
import { mockFriend, mockFriendList } from "../data";

export const friendHandlers = [
	http.get(`${BASE}/api/v1/friends`, ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page") ?? 1);
		const limit = Number(url.searchParams.get("limit") ?? 20);
		return HttpResponse.json({
			data: [mockFriend],
			total: 1,
			page,
			limit,
			totalPages: 1,
		});
	}),

	http.get(`${BASE}/api/v1/friend-list`, ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page") ?? 1);
		const limit = Number(url.searchParams.get("limit") ?? 50);
		return HttpResponse.json({
			data: [mockFriendList],
			total: 1,
			page,
			limit,
			totalPages: 1,
		});
	}),

	http.post(`${BASE}/api/v1/friend-list`, async ({ request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json(
			{ ...mockFriendList, ...body, friend_list_id: 2 },
			{ status: 201 },
		);
	}),

	http.put(`${BASE}/api/v1/friend-list/:id`, async ({ params, request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json({
			...mockFriendList,
			...body,
			friend_list_id: Number(params.id),
		});
	}),

	http.delete(`${BASE}/api/v1/friend-list/:id`, () => {
		return new HttpResponse(null, { status: 204 });
	}),
];
