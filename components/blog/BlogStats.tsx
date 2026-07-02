"use client";

import { Bookmark, Eye, Heart, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { likeBlog, saveBlog } from "@/app/lib/services/blogService";
import type { BlogStatsResponse } from "@/app/types/blog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { isBlogLiked, setBlogLikeStatus } from "@/lib/utils/storage";

interface BlogStatsProps {
	blogId: number;
	isSaved: boolean;
}

export default function BlogStats({
	blogId,
	isSaved: initialIsSaved,
}: BlogStatsProps) {
	const { isAuthenticated } = useAuth();
	const translation = useTranslations("blog");
	const [isSaved, setIsSaved] = useState(initialIsSaved);
	const [isLiked, setIsLiked] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [isLiking, setIsLiking] = useState(false);

	const { data, isLoading, error, mutate } = useSWR<BlogStatsResponse>(
		`/api/v1/blogs/${blogId}/stats`,
	);

	useEffect(() => {
		setIsSaved(initialIsSaved);
	}, [initialIsSaved]);

	useEffect(() => {
		setIsLiked(isBlogLiked(blogId));
	}, [blogId]);

	const handleLike = async () => {
		if (isLiking) return;
		try {
			setIsLiking(true);
			const response = await likeBlog(blogId);
			setIsLiked(response.data);
			setBlogLikeStatus(blogId, response.data);
			toast.success(response.message);
			mutate();
		} catch {
			toast.error(translation("likeFailed"));
		} finally {
			setIsLiking(false);
		}
	};

	const handleSave = async () => {
		if (isSaving || !isAuthenticated) return;
		try {
			setIsSaving(true);
			const response = await saveBlog(blogId);
			setIsSaved(response.data);
			toast.success(response.message);
			mutate();
		} catch {
			toast.error(translation("saveFailed"));
		} finally {
			setIsSaving(false);
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center gap-8 py-4">
				{["views", "likes", "comments", "saves"].map((stat) => (
					<div key={`skeleton-${stat}`} className="flex items-center gap-2">
						<Skeleton className="size-4" />
						<Skeleton className="h-4 w-8" />
					</div>
				))}
			</div>
		);
	}

	if (error || !data) return null;

	const stats = [
		{
			icon: Eye,
			value: data.views,
			label: translation("views"),
			clickable: false,
			active: false,
		},
		{
			icon: Heart,
			value: data.likes,
			label: translation("likes"),
			clickable: true,
			active: isLiked,
			onClick: handleLike,
		},
		{
			icon: MessageCircle,
			value: data.comments,
			label: translation("comments"),
			clickable: false,
			active: false,
		},
		{
			icon: Bookmark,
			value: data.saves,
			label: translation("saves"),
			clickable: isAuthenticated,
			active: isSaved,
			onClick: handleSave,
		},
	];

	const busy = isSaving || isLiking;

	return (
		<div className="flex items-center justify-center gap-8 py-4">
			{stats.map(({ icon: Icon, value, label, clickable, active, onClick }) => (
				<button
					key={label}
					type="button"
					aria-label={label}
					disabled={!clickable || busy}
					onClick={clickable ? onClick : undefined}
					className={cn(
						"flex items-center gap-2 text-muted-foreground transition-colors duration-200",
						{
							"cursor-pointer hover:text-foreground hover:scale-105": clickable,
							"cursor-default opacity-60": !clickable,
							"opacity-50 cursor-not-allowed": busy && clickable,
						},
					)}
				>
					<Icon
						className={cn(
							"size-4",
							busy && clickable && "animate-pulse",
							active && "text-primary fill-primary",
						)}
						strokeWidth={2}
					/>
					<span className="text-sm font-medium text-foreground">{value}</span>
				</button>
			))}
		</div>
	);
}
