// Board entity type (message board)
export interface Board {
	board_id: number;
	title: string;
	description: string;
}

// Board comment entity type
export interface BoardComment {
	comment_id: number;
	user_id: number;
	parent_id: number;
	comment: string;
	created_at: string;
	updated_at?: string;
}

// Create type
export type CreateBoardComment = Omit<
	BoardComment,
	"comment_id" | "created_at" | "updated_at"
>;

// Update type
export type UpdateBoardComment = Partial<Omit<BoardComment, "comment_id">>;
