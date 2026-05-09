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
