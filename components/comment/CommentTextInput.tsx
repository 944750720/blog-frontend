"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { mutate } from "swr";
import {
	createBlogComment,
	updateBlogComment,
} from "@/app/lib/services/blogService";
import type {
	BlogCommentItem,
	BlogCommentListResponse,
} from "@/app/types/blog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const MAX_LENGTH = 500;

interface CommentTextInputProps {
	blogId: number;
	isAuthenticated: boolean;
	parentId?: number;
	commentId?: number;
	isEditing?: boolean;
	initialComment?: string;
	replyToUsername?: string;
	onComplete?: () => void;
}

export function CommentTextInput({
	blogId,
	isAuthenticated,
	parentId,
	commentId,
	isEditing = false,
	initialComment = "",
	replyToUsername,
	onComplete,
}: CommentTextInputProps) {
	const commentT = useTranslations("comment");
	const commonT = useTranslations("common");
	const { user } = useAuth();

	const [comment, setComment] = useState(initialComment);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const swrKey = `/api/v1/blogs/${blogId}/comments/cursor?limit=10`;

	const handleSubmit = async () => {
		const trimmed = comment.trim();

		if (!trimmed) return;
		if (trimmed.length > MAX_LENGTH) return;

		setIsSubmitting(true);

		try {
			if (isEditing && commentId) {
				await mutate(
					swrKey,
					async (current: BlogCommentListResponse | undefined) => {
						await updateBlogComment(commentId, { comment: trimmed });
						if (!current) return current;
						return {
							...current,
							comments: updateCommentText(current.comments, commentId, trimmed),
						};
					},
					{
						optimisticData: (current: BlogCommentListResponse | undefined) => {
							if (!current)
								return current as unknown as BlogCommentListResponse;
							return {
								...current,
								comments: updateCommentText(
									current.comments,
									commentId,
									trimmed,
								),
							};
						},
						rollbackOnError: true,
						revalidate: true,
					},
				);
			} else {
				const optimisticItem: BlogCommentItem = {
					comment_id: -Date.now(),
					comment: trimmed,
					children: [],
					user_id: user?.user_id ?? 0,
					username: user?.username ?? "",
					avatar_url: user?.avatar_url ?? "",
					city: "",
					user_role: user?.role ?? "user",
					parent_id: parentId ?? 0,
					created_at: new Date().toISOString(),
				};

				await mutate(
					swrKey,
					async (current: BlogCommentListResponse | undefined) => {
						await createBlogComment({
							blog_id: blogId,
							user_id: user?.user_id ?? 0,
							parent_id: parentId ?? 0,
							comment: trimmed,
						});
						return current;
					},
					{
						optimisticData: (current: BlogCommentListResponse | undefined) => {
							if (!current)
								return current as unknown as BlogCommentListResponse;
							if (parentId) {
								return {
									...current,
									comments: insertChildComment(
										current.comments,
										parentId,
										optimisticItem,
									),
								};
							}
							return {
								...current,
								comments: [optimisticItem, ...current.comments],
							};
						},
						rollbackOnError: true,
						revalidate: true,
					},
				);
			}

			setComment("");
			onComplete?.();
		} catch {
			mutate(swrKey);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCancel = () => {
		setComment(initialComment);
		onComplete?.();
	};

	return (
		<div className="space-y-3">
			<div className="relative">
				{replyToUsername && (
					<p className="text-sm text-muted-foreground mb-2">
						{commentT("replyTo", { username: replyToUsername })}
					</p>
				)}
				<Textarea
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder={commentT("placeholder")}
					disabled={!isAuthenticated}
					rows={4}
				/>
				<span
					className={cn("absolute bottom-2 right-3 text-xs", {
						"text-destructive": comment.length > MAX_LENGTH,
						"text-muted-foreground": comment.length <= MAX_LENGTH,
					})}
				>
					{comment.length}/{MAX_LENGTH}
				</span>
			</div>

			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">
					{!isAuthenticated && (
						<span className="flex items-center gap-1">
							<AlertTriangle className="size-4" aria-hidden="true" />
							{commentT("loginRequired")}
						</span>
					)}
				</div>

				<div className="flex items-center gap-2">
					{(isEditing || parentId != null) && (
						<Button variant="outline" size="sm" onClick={handleCancel}>
							{commonT("cancel")}
						</Button>
					)}
					<Button
						size="sm"
						onClick={handleSubmit}
						disabled={
							!isAuthenticated ||
							!comment.trim() ||
							comment.length > MAX_LENGTH ||
							isSubmitting
						}
					>
						{isSubmitting ? (
							<Loader2 className="size-4 animate-spin" />
						) : isEditing ? (
							commentT("editComment")
						) : (
							commonT("submit")
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}

function updateCommentText(
	comments: BlogCommentItem[],
	commentId: number,
	text: string,
): BlogCommentItem[] {
	return comments.map((c) => {
		if (c.comment_id === commentId) {
			return { ...c, comment: text, updated_at: new Date().toISOString() };
		}
		if (c.children?.length) {
			return { ...c, children: updateCommentText(c.children, commentId, text) };
		}
		return c;
	});
}

function insertChildComment(
	comments: BlogCommentItem[],
	parentId: number,
	child: BlogCommentItem,
): BlogCommentItem[] {
	return comments.map((c) => {
		if (c.comment_id === parentId) {
			return { ...c, children: [child, ...(c.children ?? [])] };
		}
		if (c.children?.length) {
			return {
				...c,
				children: insertChildComment(c.children, parentId, child),
			};
		}
		return c;
	});
}
