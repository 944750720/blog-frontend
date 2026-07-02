const LIKE_KEY_PREFIX = "blog_liked_";

export function isBlogLiked(blogId: number): boolean {
	if (typeof window === "undefined") return false;
	return localStorage.getItem(`${LIKE_KEY_PREFIX}${blogId}`) === "true";
}

export function setBlogLikeStatus(blogId: number, liked: boolean): void {
	if (typeof window === "undefined") return;
	if (liked) {
		localStorage.setItem(`${LIKE_KEY_PREFIX}${blogId}`, "true");
	} else {
		localStorage.removeItem(`${LIKE_KEY_PREFIX}${blogId}`);
	}
}
