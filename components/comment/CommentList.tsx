"use client";

import { Loader2, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import {
	deleteBlogComment,
	getBlogCommentList,
} from "@/app/lib/services/blogService";
import type {
	BlogCommentItem,
	BlogCommentListResponse,
} from "@/app/types/blog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

import { CommentActions } from "./CommentActions";
import { CommentHeader } from "./CommentHeader";
import { CommentItemInput } from "./CommentItemInput";

interface CommentListProps {
	blogId: number;
	isAuthenticated: boolean;
}

export function CommentList({ blogId, isAuthenticated }: CommentListProps) {
	const commentT = useTranslations("comment");
	const commonT = useTranslations("common");
	const { user } = useAuth();

	const swrKey = `/api/v1/blogs/${blogId}/comments/cursor?limit=10`;
	const { data, isLoading } = useSWR<BlogCommentListResponse>(swrKey);

	const [extraComments, setExtraComments] = useState<BlogCommentItem[]>([]);
	const [cursor, setCursor] = useState<string | null>(null);
	const [hasNext, setHasNext] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [replyingTo, setReplyingTo] = useState<number | null>(null);
	const [editingComment, setEditingComment] = useState<number | null>(null);

	const baseComments = data?.comments ?? [];

	useEffect(() => {
		if (data?.pagination) {
			setCursor(data.pagination.next_cursor);
			setHasNext(data.pagination.has_next);
		}
	}, [data?.pagination]);

	const allComments = [...baseComments, ...extraComments];

	const isOperationInProgress = useCallback(
		(commentId: number) =>
			replyingTo === commentId || editingComment === commentId,
		[replyingTo, editingComment],
	);

	const handleDelete = async (commentId: number) => {
		await mutate(
			swrKey,
			async (current: BlogCommentListResponse | undefined) => {
				await deleteBlogComment(commentId);
				if (!current) return current;
				return {
					...current,
					comments: removeComment(current.comments, commentId),
				};
			},
			{
				optimisticData: (current: BlogCommentListResponse | undefined) => {
					if (!current) return current as unknown as BlogCommentListResponse;
					return {
						...current,
						comments: removeComment(current.comments, commentId),
					};
				},
				rollbackOnError: true,
				revalidate: true,
			},
		);
		setExtraComments((prev) => prev.filter((c) => c.comment_id !== commentId));
	};

	const handleLoadMore = async () => {
		if (!hasNext || isLoadingMore || !cursor) return;
		setIsLoadingMore(true);

		try {
			const response = await getBlogCommentList(blogId, 10, cursor);
			const newComments = response.comments.filter(
				(c) =>
					!allComments.some((existing) => existing.comment_id === c.comment_id),
			);
			if (newComments.length > 0) {
				setExtraComments((prev) => [...prev, ...newComments]);
			}
			setCursor(response.pagination.next_cursor);
			setHasNext(response.pagination.has_next);
		} finally {
			setIsLoadingMore(false);
		}
	};

	const handleComplete = () => {
		setReplyingTo(null);
		setEditingComment(null);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<Loader2 className="size-6 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (allComments.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
				<MessageCircle className="size-10 mb-3" aria-hidden="true" />
				<p className="text-sm">{commentT("title")}</p>
			</div>
		);
	}

	return (
		<section className="space-y-4" aria-label={commentT("title")}>
			{allComments.map((comment) => renderComment(comment, 0))}

			{hasNext && (
				<div className="text-center py-4">
					<Button
						variant="outline"
						onClick={handleLoadMore}
						disabled={isLoadingMore}
					>
						{isLoadingMore && (
							<Loader2
								className="size-4 animate-spin mr-2"
								aria-hidden="true"
							/>
						)}
						{commonT("loadMore")}
					</Button>
				</div>
			)}
		</section>
	);

	function renderComment(comment: BlogCommentItem, level: 0 | 1 | 2) {
		const size = level === 0 ? "md" : "sm";
		const showReply = level < 2;
		const isThirdLevel = level === 2;

		return (
			<div
				key={comment.comment_id}
				className={cn("rounded-lg p-3 sm:p-4", {
					"bg-card border border-border": level === 0,
					"ml-4 sm:ml-8 pl-3 sm:pl-4 border-l-2 border-border bg-muted/30":
						level === 1,
					"ml-8 sm:ml-12 pl-2 sm:pl-3 border-l-2 border-border/50 bg-muted/20":
						level === 2,
				})}
			>
				<CommentHeader comment={comment} size={size} />

				<div className={cn("mb-2", { "sm:mb-3": level === 0 })}>
					<p
						className={cn(
							"text-foreground leading-relaxed whitespace-pre-wrap break-words",
							{ "text-sm": level < 2, "text-xs": level === 2 },
						)}
					>
						{comment.comment}
					</p>
				</div>

				<CommentActions
					comment={comment}
					showReply={showReply}
					isAuthenticated={isAuthenticated}
					currentUserId={user?.user_id}
					currentUserRole={user?.role}
					isOperationInProgress={isOperationInProgress(comment.comment_id)}
					onReply={() => setReplyingTo(comment.comment_id)}
					onEdit={() => setEditingComment(comment.comment_id)}
					onDelete={() => handleDelete(comment.comment_id)}
				/>

				<CommentItemInput
					comment={comment}
					blogId={blogId}
					isAuthenticated={isAuthenticated}
					isReplying={replyingTo === comment.comment_id}
					isEditing={editingComment === comment.comment_id}
					isThirdLevel={isThirdLevel}
					onComplete={handleComplete}
				/>

				{comment.children && comment.children.length > 0 && level < 2 && (
					<div className="mt-3 space-y-3">
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<div className="w-4 h-px bg-border" />
							<span>
								{commentT("replies", {
									count: comment.children.length,
								})}
							</span>
							<div className="w-4 h-px bg-border" />
						</div>
						{comment.children.map((child) =>
							renderComment(child, (level + 1) as 1 | 2),
						)}
					</div>
				)}
			</div>
		);
	}
}

function removeComment(
	comments: BlogCommentItem[],
	commentId: number,
): BlogCommentItem[] {
	return comments
		.filter((c) => c.comment_id !== commentId)
		.map((c) => {
			if (c.children?.length) {
				return { ...c, children: removeComment(c.children, commentId) };
			}
			return c;
		});
}
