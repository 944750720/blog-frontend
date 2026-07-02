import type { BlogCommentItem } from "@/app/types/blog";

import { CommentTextInput } from "./CommentTextInput";

interface CommentItemInputProps {
	comment: BlogCommentItem;
	blogId: number;
	isAuthenticated: boolean;
	isReplying: boolean;
	isEditing: boolean;
	isThirdLevel?: boolean;
	onComplete: () => void;
}

export function CommentItemInput({
	comment,
	blogId,
	isAuthenticated,
	isReplying,
	isEditing,
	isThirdLevel = false,
	onComplete,
}: CommentItemInputProps) {
	if (isThirdLevel && isReplying) return null;
	if (!isReplying && !isEditing) return null;

	return (
		<div className="mt-2 sm:mt-3 ml-2 sm:ml-4">
			<CommentTextInput
				blogId={blogId}
				isAuthenticated={isAuthenticated}
				parentId={isReplying ? comment.comment_id : undefined}
				commentId={isEditing ? comment.comment_id : undefined}
				isEditing={isEditing}
				initialComment={isEditing ? comment.comment : undefined}
				replyToUsername={isReplying ? comment.username : undefined}
				onComplete={onComplete}
			/>
		</div>
	);
}
