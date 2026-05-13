import type { PaginatedResponse } from "../../types/common";
import type {
	CreateFriendList,
	Friend,
	FriendList,
	UpdateFriendList,
} from "../../types/friend";
import httpClient from "../http/client";

// Friend templates
export async function getFriendTemplates(
	page = 1,
	limit = 20,
): Promise<PaginatedResponse<Friend>> {
	const response = await httpClient.get(
		`/api/v1/friends?page=${page}&limit=${limit}`,
	);
	return response.data;
}

// Friend list (actual links)
export async function getFriendList(
	page = 1,
	limit = 50,
): Promise<PaginatedResponse<FriendList>> {
	const response = await httpClient.get(
		`/api/v1/friend-list?page=${page}&limit=${limit}`,
	);
	return response.data;
}

export async function createFriendLink(
	data: CreateFriendList,
): Promise<FriendList> {
	const response = await httpClient.post("/api/v1/friend-list", data);
	return response.data;
}

export async function updateFriendLink(
	friendListId: number,
	data: UpdateFriendList,
): Promise<FriendList> {
	const response = await httpClient.put(
		`/api/v1/friend-list/${friendListId}`,
		data,
	);
	return response.data;
}

export async function deleteFriendLink(friendListId: number): Promise<void> {
	await httpClient.delete(`/api/v1/friend-list/${friendListId}`);
}
