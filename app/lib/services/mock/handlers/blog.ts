import { HttpResponse, http } from "msw";
import { BASE } from "../constants";
import { mockBlog, mockBlogComment, mockBlogs } from "../data";

export const blogHandlers = [
	http.get(`${BASE}/api/v1/blogs`, ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page") ?? 1);
		const limit = Number(url.searchParams.get("limit") ?? 10);
		return HttpResponse.json({
			data: mockBlogs,
			total: mockBlogs.length,
			page,
			limit,
			totalPages: 1,
		});
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
