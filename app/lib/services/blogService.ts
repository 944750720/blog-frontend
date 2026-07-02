import httpClient from "@/app/lib/http/client";
import type {
	Blog,
	BlogAudioResponse,
	BlogComment,
	BlogCommentListResponse,
	BlogDetailsResponse,
	BlogNavigationResponse,
	BlogStatsResponse,
	BlogSummaryResponse,
	CreateBlog,
	CreateBlogComment,
	UpdateBlog,
	UpdateBlogComment,
} from "@/app/types/blog";
import type { BlogQueryParams, PaginatedResponse } from "@/app/types/common";

export async function getBlogs(
	params?: BlogQueryParams,
): Promise<PaginatedResponse<Blog>> {
	const query = new URLSearchParams();
	if (params?.page) query.set("page", String(params.page));
	if (params?.limit) query.set("limit", String(params.limit));
	if (params?.user_id) query.set("user_id", String(params.user_id));
	if (params?.is_published !== undefined)
		query.set("is_published", String(params.is_published));
	if (params?.tag_id) query.set("tag_id", String(params.tag_id));
	if (params?.section_id) query.set("section_id", String(params.section_id));

	const response = await httpClient.get(`/api/v1/blogs?${query.toString()}`);
	return response.data;
}

export async function getBlog(slug: string): Promise<Blog> {
	const response = await httpClient.get(`/api/v1/blogs/${slug}`);
	return response.data;
}

export async function createBlog(data: CreateBlog): Promise<Blog> {
	const response = await httpClient.post("/api/v1/blogs", data);
	return response.data;
}

export async function updateBlog(
	blogId: number,
	data: UpdateBlog,
): Promise<Blog> {
	const response = await httpClient.put(`/api/v1/blogs/${blogId}`, data);
	return response.data;
}

export async function deleteBlog(blogId: number): Promise<void> {
	await httpClient.delete(`/api/v1/blogs/${blogId}`);
}

// Blog comments
export async function getBlogComments(
	blogId: number,
	page = 1,
	limit = 10,
): Promise<PaginatedResponse<BlogComment>> {
	const response = await httpClient.get(
		`/api/v1/blogs/${blogId}/comments?page=${page}&limit=${limit}`,
	);
	return response.data;
}

export async function createBlogComment(
	data: CreateBlogComment,
): Promise<BlogComment> {
	const response = await httpClient.post("/api/v1/blog-comments", data);
	return response.data;
}

export async function updateBlogComment(
	commentId: number,
	data: UpdateBlogComment,
): Promise<BlogComment> {
	const response = await httpClient.put(
		`/api/v1/blog-comments/${commentId}`,
		data,
	);
	return response.data;
}

export async function deleteBlogComment(commentId: number): Promise<void> {
	await httpClient.delete(`/api/v1/blog-comments/${commentId}`);
}

export async function getBlogDetails(
	slug: string,
	userId?: number,
): Promise<BlogDetailsResponse> {
	const query = userId ? `?user_id=${userId}` : "";
	const response = await httpClient.get(
		`/api/v1/blogs/${slug}/details${query}`,
	);
	return response.data;
}

export async function getBlogStats(blogId: number): Promise<BlogStatsResponse> {
	const response = await httpClient.get(`/api/v1/blogs/${blogId}/stats`);
	return response.data;
}

export async function getBlogNavigation(
	blogId: number,
): Promise<BlogNavigationResponse> {
	const response = await httpClient.get(`/api/v1/blogs/${blogId}/navigation`);
	return response.data;
}

export async function getBlogSummary(
	blogId: number,
): Promise<BlogSummaryResponse> {
	const response = await httpClient.get(`/api/v1/blogs/${blogId}/summary`);
	return response.data;
}

export async function getBlogTTS(blogId: number): Promise<BlogAudioResponse> {
	const response = await httpClient.get(`/api/v1/blogs/${blogId}/tts`);
	return response.data;
}

export async function likeBlog(
	blogId: number,
): Promise<{ data: boolean; message: string }> {
	const response = await httpClient.post(`/api/v1/blogs/${blogId}/like`);
	return response.data;
}

export async function saveBlog(
	blogId: number,
): Promise<{ data: boolean; message: string }> {
	const response = await httpClient.post(`/api/v1/blogs/${blogId}/save`);
	return response.data;
}

export async function getBlogCommentList(
	blogId: number,
	limit = 10,
	cursor?: string,
): Promise<BlogCommentListResponse> {
	const query = new URLSearchParams();
	query.set("limit", String(limit));
	if (cursor) query.set("cursor", cursor);
	const response = await httpClient.get(
		`/api/v1/blogs/${blogId}/comments/cursor?${query.toString()}`,
	);
	return response.data;
}
