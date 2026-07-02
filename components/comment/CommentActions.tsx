import { Edit3, MessageCircle, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { BlogCommentItem } from "@/app/types/blog";
import { Button } from "@/components/ui/button";

interface CommentActionsProps {
	comment: BlogCommentItem;
	showReply?: boolean;
	isAuthenticated: boolean;
	currentUserId?: number;
	currentUserRole?: string;
	isOperationInProgress: boolean;
	onReply: () => void;
	onEdit: () => void;
	onDelete: () => void;
}

export function CommentActions({
	comment,
	showReply = true,
	isAuthenticated,
	currentUserId,
	currentUserRole,
	isOperationInProgress,
	onReply,
	onEdit,
	onDelete,
}: CommentActionsProps) {
	const commonT = useTranslations("common");
	const commentT = useTranslations("comment");

	const isOwner = comment.user_id === currentUserId;
	const isAdmin = currentUserRole === "admin";
	const canEdit = isOwner;
	const canDelete = isOwner || isAdmin;

	return (
		<div className="flex items-center justify-between pt-2 border-t border-border">
			<div className="flex items-center gap-1">
				{isAuthenticated && showReply && (
					<Button
						variant="ghost"
						size="sm"
						onClick={onReply}
						disabled={isOperationInProgress}
					>
						<MessageCircle className="size-3.5" aria-hidden="true" />
						{commonT("reply")}
					</Button>
				)}
			</div>

			{isAuthenticated && (canEdit || canDelete) && (
				<div className="flex items-center gap-1">
					{canEdit && (
						<Button
							variant="ghost"
							size="sm"
							onClick={onEdit}
							disabled={isOperationInProgress}
						>
							<Edit3 className="size-3.5" aria-hidden="true" />
							{commonT("edit")}
						</Button>
					)}

					{canDelete && (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => {
								if (window.confirm(commentT("deleteConfirm"))) {
									onDelete();
								}
							}}
							disabled={isOperationInProgress}
						>
							<Trash2 className="size-3.5" aria-hidden="true" />
							{commonT("delete")}
						</Button>
					)}
				</div>
			)}
		</div>
	);
}
