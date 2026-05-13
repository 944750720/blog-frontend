import type { BlogTag, CreateTag, Tag, UpdateTag } from "../../types/blog";
import type { PaginatedResponse } from "../../types/common";
import httpClient from "../http/client";

export async function getTags(
	page = 1,
	limit = 50,
): Promise<PaginatedResponse<Tag>> {
	const response = await httpClient.get(
		`/api/v1/tags?page=${page}&limit=${limit}`,
	);
	return response.data;
}

export async function getTag(slug: string): Promise<Tag> {
	const response = await httpClient.get(`/api/v1/tags/${slug}`);
	return response.data;
}

export async function createTag(data: CreateTag): Promise<Tag> {
	const response = await httpClient.post("/api/v1/tags", data);
	return response.data;
}

export async function updateTag(tagId: number, data: UpdateTag): Promise<Tag> {
	const response = await httpClient.put(`/api/v1/tags/${tagId}`, data);
	return response.data;
}

export async function deleteTag(tagId: number): Promise<void> {
	await httpClient.delete(`/api/v1/tags/${tagId}`);
}

// Blog-Tag relations
export async function addTagToBlog(
	blogId: number,
	tagId: number,
): Promise<BlogTag> {
	const response = await httpClient.post("/api/v1/blog-tags", {
		blog_id: blogId,
		tag_id: tagId,
	});
	return response.data;
}

export async function removeTagFromBlog(
	blogId: number,
	tagId: number,
): Promise<void> {
	await httpClient.delete(`/api/v1/blog-tags/${blogId}/${tagId}`);
}
