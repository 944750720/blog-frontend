import type { PaginatedResponse } from "../../types/common";
import type { CreateSeo, Seo, UpdateSeo } from "../../types/seo";
import httpClient from "../http/client";

export async function getSeoConfigs(
	page = 1,
	limit = 10,
): Promise<PaginatedResponse<Seo>> {
	const response = await httpClient.get(
		`/api/v1/seo?page=${page}&limit=${limit}`,
	);
	return response.data;
}

export async function getSeoConfig(seoId: number): Promise<Seo> {
	const response = await httpClient.get(`/api/v1/seo/${seoId}`);
	return response.data;
}

export async function createSeoConfig(data: CreateSeo): Promise<Seo> {
	const response = await httpClient.post("/api/v1/seo", data);
	return response.data;
}

export async function updateSeoConfig(
	seoId: number,
	data: UpdateSeo,
): Promise<Seo> {
	const response = await httpClient.put(`/api/v1/seo/${seoId}`, data);
	return response.data;
}

export async function deleteSeoConfig(seoId: number): Promise<void> {
	await httpClient.delete(`/api/v1/seo/${seoId}`);
}
