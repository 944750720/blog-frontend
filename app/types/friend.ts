// Friend entity type (template for friend links)
export interface Friend {
	friend_id: number;
	title: string;
	description: string;
}

// FriendList entity type (actual friend links)
export interface FriendList {
	friend_list_id: number;
	user_id: number;
	friend_id: number;
	logo_url: string;
	site_url: string;
	title: string;
	description: string;
	type: number;
	created_at: string;
	updated_at: string;
}

// Create type
export type CreateFriendList = Omit<
	FriendList,
	"friend_list_id" | "created_at" | "updated_at"
>;

// Update type
export type UpdateFriendList = Partial<Omit<FriendList, "friend_list_id">>;
