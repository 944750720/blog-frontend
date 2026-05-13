import type { Blog, BlogComment, Tag } from "../../../types/blog";
import type { Board, BoardComment } from "../../../types/board";
import type { Coffee } from "../../../types/coffee";
import type { Friend, FriendList } from "../../../types/friend";
import type { Media } from "../../../types/media";
import type { Section } from "../../../types/section";
import type { Seo } from "../../../types/seo";
import type { User } from "../../../types/user";

// User
export const mockUser: User = {
	user_id: 1,
	id: "1",
	email: "admin@blog.com",
	username: "admin",
	role: "admin",
	avatar_url: "https://example.com/avatar.jpg",
	bio: "Blog administrator",
	city: "Tokyo",
	is_active: true,
	is_verified: true,
	created_at: "2024-01-01T00:00:00Z",
};

// Blog
export const mockBlog: Blog = {
	blog_id: 1,
	user_id: 1,
	blog_slug: "hello-world",
	blog_title: "Hello World",
	blog_description: "My first blog post",
	cover_url: "https://example.com/cover.jpg",
	blog_content: { type: "doc", content: [{ type: "paragraph" }] },
	is_published: true,
	is_archived: false,
	is_featured: false,
	created_at: "2024-01-01T00:00:00Z",
	views: 100,
	likes: 10,
	comments: 5,
	saves: 3,
};

export const mockBlogs: Blog[] = [
	mockBlog,
	{
		...mockBlog,
		blog_id: 2,
		blog_slug: "second-post",
		blog_title: "Second Post",
	},
];

// BlogComment
export const mockBlogComment: BlogComment = {
	comment_id: 1,
	user_id: 2,
	parent_id: 0,
	comment: "Great post!",
	created_at: "2024-01-01T00:00:00Z",
};

// Tag
export const mockTag: Tag = {
	tag_id: 1,
	title: "JavaScript",
	slug: "javascript",
	created_at: "2024-01-01T00:00:00Z",
};

export const mockTags: Tag[] = [
	mockTag,
	{
		tag_id: 2,
		title: "TypeScript",
		slug: "typescript",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		tag_id: 3,
		title: "React",
		slug: "react",
		created_at: "2024-01-01T00:00:00Z",
	},
];

// Section
export const mockSection: Section = {
	section_id: 1,
	type: "category",
	title: "Technology",
	slug: "technology",
	description: "Tech articles",
	is_active: true,
	created_at: "2024-01-01T00:00:00Z",
};

export const mockSections: Section[] = [
	mockSection,
	{
		...mockSection,
		section_id: 2,
		title: "Life",
		slug: "life",
		description: "Life stories",
	},
];

// Seo
export const mockSeo: Seo = {
	seo_id: 1,
	title: "My Blog",
	description: "A personal blog about technology and life",
	keywords: "blog,technology,life",
	created_at: "2024-01-01T00:00:00Z",
};

// Media
export const mockMedia: Media = {
	media_id: 1,
	media_uuid: "550e8400-e29b-41d4-a716-446655440000",
	media_type: "image",
	file_name: "cover.jpg",
	original_filepath_url: "https://example.com/media/cover.jpg",
	thumbnail_filepath_url: "https://example.com/media/cover_thumb.jpg",
	file_size: 1024000,
	created_at: "2024-01-01T00:00:00Z",
};

// Coffee
export const mockCoffee: Coffee = {
	coffee_id: 1,
	user_id: 1,
	payment_method: "alipay",
	amount: 10,
	currency: "CNY",
	status: "completed",
	message: "Great blog!",
	created_at: "2024-01-01T00:00:00Z",
};

export const mockCoffeeStats = {
	total: 100,
	count: 25,
	byCurrency: {
		CNY: { total: 500, count: 15 },
		JPY: { total: 3000, count: 5 },
		USD: { total: 20, count: 5 },
	},
};

// Friend
export const mockFriend: Friend = {
	friend_id: 1,
	title: "Tech Blog",
	description: "A technology blog template",
};

export const mockFriendList: FriendList = {
	friend_list_id: 1,
	user_id: 1,
	friend_id: 1,
	logo_url: "https://example.com/logo.jpg",
	site_url: "https://example.com",
	title: "Example Blog",
	description: "My friend's blog",
	type: 1,
	created_at: "2024-01-01T00:00:00Z",
	updated_at: "2024-01-01T00:00:00Z",
};

// Board
export const mockBoard: Board = {
	board_id: 1,
	title: "Message Board",
	description: "Leave a message!",
};

export const mockBoardComment: BoardComment = {
	comment_id: 1,
	user_id: 2,
	parent_id: 0,
	comment: "Hello everyone!",
	created_at: "2024-01-01T00:00:00Z",
};

// Auth
export const mockAuthResponse = {
	token: "mock-jwt-token",
	user: {
		id: "1",
		email: "admin@blog.com",
		username: "admin",
		role: "admin",
	},
};
