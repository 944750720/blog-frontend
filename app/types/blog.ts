import type { JSONContent } from "@tiptap/react";

// Blog entity type
export interface Blog {
	blog_id: number;
	user_id: number;
	blog_slug: string;
	blog_title: string;
	blog_description: string;
	cover_url: string;
	blog_content: JSONContent;
	is_published: boolean;
	is_archived: boolean;
	is_featured: boolean;
	created_at: string;
	updated_at?: string;
	views: number;
	likes: number;
	comments: number;
	saves: number;
}

// Blog comment entity type
export interface BlogComment {
	comment_id: number;
	blog_id: number;
	user_id: number;
	parent_id: number;
	comment: string;
	created_at: string;
	updated_at?: string;
}

// Tag entity type
export interface Tag {
	tag_id: number;
	title: string;
	slug: string;
	created_at: string;
	updated_at?: string;
}

// Blog-Tag junction table type
export interface BlogTag {
	blog_id: number;
	tag_id: number;
}

// Create types
export type CreateBlog = Omit<
	Blog,
	| "blog_id"
	| "created_at"
	| "updated_at"
	| "views"
	| "likes"
	| "comments"
	| "saves"
>;
export type CreateBlogComment = Omit<
	BlogComment,
	"comment_id" | "created_at" | "updated_at"
>;
export type CreateTag = Omit<Tag, "tag_id" | "created_at" | "updated_at">;

// Update types
export type UpdateBlog = Partial<Omit<Blog, "blog_id">>;
export type UpdateBlogComment = Partial<Omit<BlogComment, "comment_id">>;
export type UpdateTag = Partial<Omit<Tag, "tag_id">>;

export interface BlogListItem {
	blog_id: number;
	blog_slug: string;
	blog_title: string;
	blog_description: string;
	cover_url: string;
	blog_tags: { tag_id: number; tag_title: string }[];
	blog_stats: { views: number; likes: number; comments: number; saves: number };
	created_at: string;
	updated_at?: string;
}

export interface BlogDetailsResponse {
	blog_id: number;
	blog_title: string;
	blog_description: string;
	cover_url: string;
	blog_content: JSONContent;
	is_saved: boolean;
	blog_tags: { tag_id: number; tag_slug: string; tag_title: string }[];
	blog_stats: { views: number; likes: number; comments: number; saves: number };
	created_at: string;
	updated_at?: string;
}

export interface BlogStatsResponse {
	views: number;
	likes: number;
	comments: number;
	saves: number;
}

export interface BlogNavigationResponse {
	previous?: {
		section_slug: string;
		blog_slug: string;
		blog_title: string;
	};
	next?: { section_slug: string; blog_slug: string; blog_title: string };
}

export interface BlogSummaryResponse {
	summary: string;
}

export interface BlogAudioResponse {
	blog_id: number;
	tts: string | null;
}

export interface BlogCommentItem {
	comment_id: number;
	user_id: number;
	username: string;
	avatar_url: string;
	user_role: string;
	city: string;
	parent_id: number;
	comment: string;
	created_at: string;
	updated_at?: string;
	children?: BlogCommentItem[];
}

export interface BlogCommentListResponse {
	comments: BlogCommentItem[];
	pagination: {
		next_cursor: string | null;
		has_next: boolean;
	};
}
