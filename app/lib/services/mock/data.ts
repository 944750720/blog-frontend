import type {
	Blog,
	BlogAudioResponse,
	BlogComment,
	BlogCommentItem,
	BlogCommentListResponse,
	BlogDetailsResponse,
	BlogListItem,
	BlogNavigationResponse,
	BlogStatsResponse,
	BlogSummaryResponse,
	Tag,
} from "@/app/types/blog";
import type { Board, BoardComment } from "@/app/types/board";
import type { Coffee } from "@/app/types/coffee";
import type { Friend, FriendList } from "@/app/types/friend";
import type { Media } from "@/app/types/media";
import type { Section } from "@/app/types/section";
import type { Seo } from "@/app/types/seo";
import type { User } from "@/app/types/user";

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
	blog_id: 1,
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

// Blog list items (with tags and stats)
export const mockBlogListItem: BlogListItem = {
	blog_id: 1,
	blog_slug: "hello-world",
	blog_title: "Hello World",
	blog_description: "My first blog post about web development",
	cover_url: "https://picsum.photos/800/400?random=1",
	blog_tags: [
		{ tag_id: 1, tag_title: "JavaScript" },
		{ tag_id: 2, tag_title: "TypeScript" },
	],
	blog_stats: { views: 100, likes: 10, comments: 5, saves: 3 },
	created_at: "2024-06-01T00:00:00Z",
};

export const mockBlogListItems: BlogListItem[] = [
	mockBlogListItem,
	{
		...mockBlogListItem,
		blog_id: 2,
		blog_slug: "getting-started-with-nextjs",
		blog_title: "Getting Started with Next.js",
		blog_description:
			"A comprehensive guide to building modern web apps with Next.js 16",
		cover_url: "https://picsum.photos/800/400?random=2",
		blog_tags: [{ tag_id: 3, tag_title: "React" }],
		blog_stats: { views: 250, likes: 25, comments: 8, saves: 12 },
		created_at: "2024-06-15T00:00:00Z",
	},
	{
		...mockBlogListItem,
		blog_id: 3,
		blog_slug: "tailwind-css-tips",
		blog_title: "Tailwind CSS Tips & Tricks",
		blog_description: "Practical tips for writing better Tailwind CSS",
		cover_url: "https://picsum.photos/800/400?random=3",
		blog_tags: [
			{ tag_id: 4, tag_title: "CSS" },
			{ tag_id: 5, tag_title: "Tailwind" },
		],
		blog_stats: { views: 180, likes: 15, comments: 3, saves: 7 },
		created_at: "2024-07-01T00:00:00Z",
	},
	{
		...mockBlogListItem,
		blog_id: 4,
		blog_slug: "typescript-best-practices",
		blog_title: "TypeScript Best Practices",
		blog_description: "Writing cleaner and safer TypeScript code",
		cover_url: "https://picsum.photos/800/400?random=4",
		blog_tags: [{ tag_id: 2, tag_title: "TypeScript" }],
		blog_stats: { views: 320, likes: 40, comments: 12, saves: 18 },
		created_at: "2024-07-15T00:00:00Z",
	},
];

export const mockBlogDetails: BlogDetailsResponse = {
	blog_id: 1,
	blog_title: "Hello World",
	blog_description: "My first blog post about web development",
	cover_url: "https://picsum.photos/800/400?random=1",
	blog_content: {
		type: "doc",
		content: [
			{
				type: "heading",
				attrs: { level: 2 },
				content: [{ type: "text", text: "Introduction" }],
			},
			{
				type: "paragraph",
				content: [
					{
						type: "text",
						text: "Welcome to my blog! This is a sample post demonstrating various content features.",
					},
				],
			},
			{
				type: "heading",
				attrs: { level: 2 },
				content: [{ type: "text", text: "Code Example" }],
			},
			{
				type: "codeBlock",
				attrs: { language: "typescript" },
				content: [
					{
						type: "text",
						text: 'const greeting = "Hello, World!";\nconsole.log(greeting);',
					},
				],
			},
			{
				type: "heading",
				attrs: { level: 2 },
				content: [{ type: "text", text: "Conclusion" }],
			},
			{
				type: "paragraph",
				content: [
					{
						type: "text",
						text: "Thanks for reading! Stay tuned for more posts.",
					},
				],
			},
		],
	},
	is_saved: false,
	blog_tags: [
		{ tag_id: 1, tag_slug: "javascript", tag_title: "JavaScript" },
		{ tag_id: 2, tag_slug: "typescript", tag_title: "TypeScript" },
	],
	blog_stats: { views: 100, likes: 10, comments: 5, saves: 3 },
	created_at: "2024-06-01T00:00:00Z",
	updated_at: "2024-06-10T00:00:00Z",
};

export const mockBlogStats: BlogStatsResponse = {
	views: 100,
	likes: 10,
	comments: 5,
	saves: 3,
};

export const mockBlogNavigation: BlogNavigationResponse = {
	previous: {
		section_slug: "blog",
		blog_slug: "previous-post",
		blog_title: "Previous Post Title",
	},
	next: {
		section_slug: "blog",
		blog_slug: "next-post",
		blog_title: "Next Post Title",
	},
};

export const mockBlogSummary: BlogSummaryResponse = {
	summary:
		"This blog post introduces web development concepts and demonstrates various content features including code examples, headings, and paragraphs.",
};

export const mockBlogAudio: BlogAudioResponse = {
	blog_id: 1,
	tts: "https://example.com/audio/blog-1.mp3",
};

export const mockBlogCommentItems: BlogCommentItem[] = [
	{
		comment_id: 1,
		user_id: 2,
		username: "reader1",
		avatar_url: "https://picsum.photos/40/40?random=10",
		user_role: "user",
		city: "Tokyo",
		parent_id: 0,
		comment: "Great article! Very informative.",
		created_at: "2024-06-02T10:00:00Z",
		children: [
			{
				comment_id: 3,
				user_id: 1,
				username: "admin",
				avatar_url: "https://picsum.photos/40/40?random=11",
				user_role: "admin",
				city: "Shanghai",
				parent_id: 1,
				comment: "Thanks for reading!",
				created_at: "2024-06-02T12:00:00Z",
				children: [
					{
						comment_id: 5,
						user_id: 2,
						username: "reader1",
						avatar_url: "https://picsum.photos/40/40?random=10",
						user_role: "user",
						city: "Tokyo",
						parent_id: 3,
						comment: "Keep up the good work!",
						created_at: "2024-06-02T14:00:00Z",
					},
				],
			},
		],
	},
	{
		comment_id: 2,
		user_id: 3,
		username: "reader2",
		avatar_url: "https://picsum.photos/40/40?random=12",
		user_role: "user",
		city: "Beijing",
		parent_id: 0,
		comment: "Looking forward to more posts like this.",
		created_at: "2024-06-03T08:00:00Z",
	},
];

export const mockBlogCommentListResponse: BlogCommentListResponse = {
	comments: mockBlogCommentItems,
	pagination: {
		next_cursor: null,
		has_next: false,
	},
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
