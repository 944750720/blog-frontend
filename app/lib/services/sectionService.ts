import type { PaginatedResponse } from "../../types/common";
import type {
	CreateSection,
	Section,
	UpdateSection,
} from "../../types/section";
import httpClient from "../http/client";

export async function getSections(
	page = 1,
	limit = 50,
): Promise<PaginatedResponse<Section>> {
	const response = await httpClient.get(
		`/api/v1/sections?page=${page}&limit=${limit}`,
	);
	return response.data;
}

export async function getSection(slug: string): Promise<Section> {
	const response = await httpClient.get(`/api/v1/sections/${slug}`);
	return response.data;
}

export async function createSection(data: CreateSection): Promise<Section> {
	const response = await httpClient.post("/api/v1/sections", data);
	return response.data;
}

export async function updateSection(
	sectionId: number,
	data: UpdateSection,
): Promise<Section> {
	const response = await httpClient.put(`/api/v1/sections/${sectionId}`, data);
	return response.data;
}

export async function deleteSection(sectionId: number): Promise<void> {
	await httpClient.delete(`/api/v1/sections/${sectionId}`);
}
