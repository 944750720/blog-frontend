import type {
	Blog,
	BlogComment,
	CreateBlog,
	CreateBlogComment,
	UpdateBlog,
	UpdateBlogComment,
} from "../../types/blog";
import type { BlogQueryParams, PaginatedResponse } from "../../types/common";
import httpClient from "../http/client";

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
