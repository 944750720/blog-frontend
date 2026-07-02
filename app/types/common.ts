// Pagination query parameters
export interface PaginationParams {
	page: number;
	limit: number;
}

// Paginated response wrapper
export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

// Blog query parameters
export interface BlogQueryParams extends PaginationParams {
	user_id?: number;
	is_published?: boolean;
	is_archived?: boolean;
	is_featured?: boolean;
	tag_id?: number;
	section_id?: number;
}

// Comment query parameters
export interface CommentQueryParams extends PaginationParams {
	user_id?: number;
	parent_id?: number;
}

// Coffee query parameters
export interface CoffeeQueryParams extends PaginationParams {
	user_id?: number;
	currency?: "CNY" | "JPY" | "USD";
	status?: string;
}

export interface CursorPaginationParams {
	limit: number;
	cursor?: string;
}
