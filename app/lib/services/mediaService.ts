import type { PaginatedResponse } from "../../types/common";
import type { Media } from "../../types/media";
import httpClient from "../http/client";

export async function getMediaList(
	page = 1,
	limit = 20,
): Promise<PaginatedResponse<Media>> {
	const response = await httpClient.get(
		`/api/v1/media?page=${page}&limit=${limit}`,
	);
	return response.data;
}

export async function getMedia(mediaId: number): Promise<Media> {
	const response = await httpClient.get(`/api/v1/media/${mediaId}`);
	return response.data;
}

export async function uploadMedia(file: File): Promise<Media> {
	const formData = new FormData();
	formData.append("file", file);
	const response = await httpClient.post("/api/v1/media/upload", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return response.data;
}

export async function deleteMedia(mediaId: number): Promise<void> {
	await httpClient.delete(`/api/v1/media/${mediaId}`);
}
