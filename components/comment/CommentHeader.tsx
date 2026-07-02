import { Clock, MapPin } from "lucide-react";
import { useFormatter, useNow, useTranslations } from "next-intl";
import type { BlogCommentItem } from "@/app/types/blog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface CommentHeaderProps {
	comment: BlogCommentItem;
	size?: "sm" | "md";
}

const SIZE_CONFIG = {
	sm: { avatarSize: "sm" as const, icon: "size-3", text: "text-sm" },
	md: { avatarSize: "default" as const, icon: "size-4", text: "text-base" },
} as const;

export function CommentHeader({ comment, size = "md" }: CommentHeaderProps) {
	const commonT = useTranslations("common");
	const formatter = useFormatter();
	const now = useNow({ updateInterval: 60_000 });
	const { avatarSize, icon: iconSize, text: textSize } = SIZE_CONFIG[size];

	const formatRelative = (date: string) =>
		formatter.relativeTime(new Date(date), now);

	const formattedDate = comment.updated_at
		? `${commonT("updatedAt")} ${formatRelative(comment.updated_at)}`
		: formatRelative(comment.created_at);

	return (
		<div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
			<Avatar
				size={avatarSize}
				className={cn("shrink-0", {
					"ring-2 ring-primary": comment.user_role === "admin",
				})}
			>
				<AvatarImage
					src={comment.avatar_url}
					alt={comment.username || commonT("anonymous")}
				/>
				<AvatarFallback>
					{(comment.username || "U").charAt(0).toUpperCase()}
				</AvatarFallback>
			</Avatar>

			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2">
					<h4 className={cn("font-medium text-foreground truncate", textSize)}>
						{comment.username || commonT("anonymous")}
					</h4>
					{comment.city && (
						<span className="flex items-center shrink-0 text-muted-foreground sm:hidden">
							<MapPin className={cn(iconSize, "mr-1")} aria-hidden="true" />
							<span className="whitespace-nowrap text-xs">{comment.city}</span>
						</span>
					)}
				</div>

				<div className="flex items-center mt-1 text-muted-foreground sm:hidden">
					<Clock className={cn(iconSize, "mr-1")} aria-hidden="true" />
					<span className="text-xs">{formattedDate}</span>
				</div>

				<div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
					{comment.city && (
						<span className="flex items-center">
							<MapPin className={cn(iconSize, "mr-1")} aria-hidden="true" />
							<span>{comment.city}</span>
						</span>
					)}
					<span className="flex items-center">
						<Clock className={cn(iconSize, "mr-1")} aria-hidden="true" />
						<span>{formattedDate}</span>
					</span>
				</div>
			</div>
		</div>
	);
}
