import { HttpResponse, http } from "msw";
import { BASE } from "../constants";
import {
	mockBlog,
	mockBlogAudio,
	mockBlogComment,
	mockBlogCommentListResponse,
	mockBlogDetails,
	mockBlogListItems,
	mockBlogNavigation,
	mockBlogStats,
	mockBlogSummary,
} from "../data";

export const blogHandlers = [
	http.get(`${BASE}/api/v1/blogs`, ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page") ?? 1);
		const limit = Number(url.searchParams.get("limit") ?? 6);
		return HttpResponse.json({
			data: mockBlogListItems,
			total: 4,
			page,
			limit,
			totalPages: 1,
		});
	}),

	http.get(`${BASE}/api/v1/blogs/:slug/details`, ({ params }) => {
		return HttpResponse.json({
			...mockBlogDetails,
			blog_slug: params.slug,
		});
	}),

	http.get(`${BASE}/api/v1/blogs/:blogId/stats`, () => {
		return HttpResponse.json(mockBlogStats);
	}),

	http.get(`${BASE}/api/v1/blogs/:blogId/navigation`, () => {
		return HttpResponse.json(mockBlogNavigation);
	}),

	http.get(`${BASE}/api/v1/blogs/:blogId/summary`, () => {
		return HttpResponse.json(mockBlogSummary);
	}),

	http.get(`${BASE}/api/v1/blogs/:blogId/tts`, () => {
		return HttpResponse.json(mockBlogAudio);
	}),

	http.post(`${BASE}/api/v1/blogs/:blogId/like`, () => {
		return HttpResponse.json({ data: true, message: "Blog liked" });
	}),

	http.post(`${BASE}/api/v1/blogs/:blogId/save`, () => {
		return HttpResponse.json({ data: true, message: "Blog saved" });
	}),

	http.get(`${BASE}/api/v1/blogs/:blogId/comments/cursor`, () => {
		return HttpResponse.json(mockBlogCommentListResponse);
	}),

	http.get(`${BASE}/api/v1/blogs/:slug`, ({ params }) => {
		return HttpResponse.json({ ...mockBlog, blog_slug: params.slug });
	}),

	http.post(`${BASE}/api/v1/blogs`, async ({ request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json(
			{ ...mockBlog, ...body, blog_id: 3 },
			{ status: 201 },
		);
	}),

	http.put(`${BASE}/api/v1/blogs/:id`, async ({ params, request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json({
			...mockBlog,
			...body,
			blog_id: Number(params.id),
		});
	}),

	http.delete(`${BASE}/api/v1/blogs/:id`, () => {
		return new HttpResponse(null, { status: 204 });
	}),

	// Blog comments
	http.get(`${BASE}/api/v1/blogs/:id/comments`, ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page") ?? 1);
		const limit = Number(url.searchParams.get("limit") ?? 10);
		return HttpResponse.json({
			data: [mockBlogComment],
			total: 1,
			page,
			limit,
			totalPages: 1,
		});
	}),

	http.post(`${BASE}/api/v1/blog-comments`, async ({ request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json(
			{ ...mockBlogComment, ...body, comment_id: 2 },
			{ status: 201 },
		);
	}),

	http.put(`${BASE}/api/v1/blog-comments/:id`, async ({ params, request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		return HttpResponse.json({
			...mockBlogComment,
			...body,
			comment_id: Number(params.id),
		});
	}),

	http.delete(`${BASE}/api/v1/blog-comments/:id`, () => {
		return new HttpResponse(null, { status: 204 });
	}),
];
