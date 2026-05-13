import type {
	Board,
	BoardComment,
	CreateBoardComment,
	UpdateBoardComment,
} from "../../types/board";
import type { CommentQueryParams, PaginatedResponse } from "../../types/common";
import httpClient from "../http/client";

// Board config
export async function getBoard(): Promise<Board> {
	const response = await httpClient.get("/api/v1/board");
	return response.data;
}

// Board comments
export async function getBoardComments(
	params?: CommentQueryParams,
): Promise<PaginatedResponse<BoardComment>> {
	const query = new URLSearchParams();
	if (params?.page) query.set("page", String(params.page));
	if (params?.limit) query.set("limit", String(params.limit));
	if (params?.user_id) query.set("user_id", String(params.user_id));
	if (params?.parent_id) query.set("parent_id", String(params.parent_id));

	const response = await httpClient.get(
		`/api/v1/board-comments?${query.toString()}`,
	);
	return response.data;
}

export async function createBoardComment(
	data: CreateBoardComment,
): Promise<BoardComment> {
	const response = await httpClient.post("/api/v1/board-comments", data);
	return response.data;
}

export async function updateBoardComment(
	commentId: number,
	data: UpdateBoardComment,
): Promise<BoardComment> {
	const response = await httpClient.put(
		`/api/v1/board-comments/${commentId}`,
		data,
	);
	return response.data;
}

export async function deleteBoardComment(commentId: number): Promise<void> {
	await httpClient.delete(`/api/v1/board-comments/${commentId}`);
}
