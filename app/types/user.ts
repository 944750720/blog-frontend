// User entity type
export interface User {
	user_id: number;
	id: string;
	email: string;
	username: string;
	role: string;
	avatar_url?: string;
	bio?: string;
	city?: string;
	ip_address?: string;
	longitude?: number;
	latitude?: number;
	is_active?: boolean;
	is_verified?: boolean;
	created_at: string;
	updated_at?: string;
}

// Type for creating a new user (omit auto-generated fields)
export type CreateUser = Omit<User, "user_id" | "created_at" | "updated_at">;

// Type for updating a user (all fields optional except user_id)
export type UpdateUser = Partial<Omit<User, "user_id">>;
