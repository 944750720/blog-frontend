import type { PaginatedResponse } from "../../types/common";
import type { CreateUser, UpdateUser, User } from "../../types/user";
import httpClient from "../http/client";

export async function getUser(userId: number): Promise<User> {
	const response = await httpClient.get(`/api/v1/users/${userId}`);
	return response.data;
}

export async function getUsers(
	page = 1,
	limit = 10,
): Promise<PaginatedResponse<User>> {
	const response = await httpClient.get(
		`/api/v1/users?page=${page}&limit=${limit}`,
	);
	return response.data;
}

export async function createUser(data: CreateUser): Promise<User> {
	const response = await httpClient.post("/api/v1/users", data);
	return response.data;
}

export async function updateUser(
	userId: number,
	data: UpdateUser,
): Promise<User> {
	const response = await httpClient.put(`/api/v1/users/${userId}`, data);
	return response.data;
}

export async function deleteUser(userId: number): Promise<void> {
	await httpClient.delete(`/api/v1/users/${userId}`);
}
