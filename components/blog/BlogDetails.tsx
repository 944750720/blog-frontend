"use client";

import { FileText } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import useSWR from "swr";
import type { BlogDetailsResponse } from "@/app/types/blog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/utils/date";
import { CommentList } from "../comment/CommentList";
import { CommentTextInput } from "../comment/CommentTextInput";
import { TextContent } from "../content/TextContent";
import { TOC } from "../content/TOC";
import BlogAction from "./BlogAction";
import BlogNavigation from "./BlogNavigation";
import BlogStats from "./BlogStats";

interface BlogDetailsProps {
	blogSlug: string;
}

function BlogDetailsSkeleton() {
	return (
		<div className="max-w-4xl mx-auto px-3 py-12">
			<Skeleton className="w-full h-64 md:h-80 rounded-sm mb-8" />
			<Skeleton className="h-10 w-3/4 mx-auto mb-4" />
			<Skeleton className="h-6 w-1/2 mx-auto mb-4" />
			<div className="flex justify-center gap-2 mb-4">
				<Skeleton className="h-6 w-20" />
				<Skeleton className="h-6 w-20" />
			</div>
			<Skeleton className="h-4 w-48 mx-auto mb-8" />
			<Skeleton className="h-96 w-full" />
		</div>
	);
}

export function BlogDetails({ blogSlug }: BlogDetailsProps) {
	const locale = useLocale();
	const t = useTranslations("common");
	const { isAuthenticated, user } = useAuth();

	const swrKey = user?.user_id
		? [`/api/v1/blogs/${blogSlug}/details?user_id=${user.user_id}`, locale]
		: [`/api/v1/blogs/${blogSlug}/details`, locale];

	const { data: blog, isLoading, error } = useSWR<BlogDetailsResponse>(swrKey);

	if (isLoading) return <BlogDetailsSkeleton />;

	if (error) {
		return (
			<div className="max-w-4xl mx-auto px-3 py-12 text-center">
				<p className="text-destructive">{t("loadFailed")}</p>
				<p className="text-muted-foreground mt-2">{t("loadFailedMessage")}</p>
			</div>
		);
	}

	if (!blog) {
		return (
			<div className="max-w-4xl mx-auto px-3 py-12 text-center">
				<FileText
					className="w-12 h-12 mx-auto text-muted-foreground mb-4"
					aria-hidden="true"
				/>
				<p className="text-foreground font-medium">{t("notFound")}</p>
				<p className="text-muted-foreground mt-1">{t("notFoundMessage")}</p>
			</div>
		);
	}

	return (
		<article className="max-w-4xl mx-auto px-3 py-12">
			<header className="text-center mb-16">
				{blog.cover_url && (
					<div className="relative w-full h-64 md:h-80 mb-8 rounded-sm overflow-hidden">
						<Image
							src={blog.cover_url}
							alt={blog.blog_title}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
							className="object-cover"
							priority
						/>
					</div>
				)}

				<h1 className="text-4xl mb-4 text-foreground font-bold">
					{blog.blog_title}
				</h1>

				<p className="text-lg max-w-2xl mx-auto leading-relaxed text-muted-foreground font-medium mb-4 italic">
					{t("summary")}: {blog.blog_description}
				</p>

				{blog.blog_tags?.length > 0 && (
					<div className="flex flex-wrap gap-2 justify-center mb-4">
						{blog.blog_tags.map((tag) => (
							<Badge
								key={tag.tag_id}
								variant="secondary"
								className="cursor-pointer"
							>
								{tag.tag_title}
							</Badge>
						))}
					</div>
				)}

				<div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-4">
					<div className="flex items-center gap-2 text-sm">
						<div className="w-2 h-2 rounded-full bg-primary" />
						<span className="text-muted-foreground text-xs font-medium">
							{t("createdAt")}:
						</span>
						<span className="text-foreground font-semibold text-sm">
							{formatDate(blog.created_at, locale)}
						</span>
					</div>
					{blog.updated_at && (
						<>
							<div className="hidden sm:block w-px h-4 bg-border" />
							<div className="flex items-center gap-2 text-sm">
								<div className="w-2 h-2 rounded-full bg-muted-foreground" />
								<span className="text-muted-foreground text-xs font-medium">
									{t("updatedAt")}:
								</span>
								<span className="text-foreground font-semibold text-sm">
									{formatDate(blog.updated_at, locale)}
								</span>
							</div>
						</>
					)}
				</div>

				<Separator className="max-w-2xl mx-auto" />

				<div className="my-6">
					<BlogStats blogId={blog.blog_id} isSaved={blog.is_saved} />
				</div>

				<div className="m-4">
					<BlogAction blogId={blog.blog_id} />
				</div>
			</header>

			<section className="mb-16">
				<TOC />
				<TextContent content={blog.blog_content} />
			</section>

			<Separator className="my-8" />

			<section className="my-16">
				<BlogNavigation blogId={blog.blog_id} />
			</section>

			<Separator className="mb-16" />

			<section className="mb-16">
				<div className="rounded-sm p-8 border bg-card">
					<CommentTextInput
						blogId={blog.blog_id}
						isAuthenticated={isAuthenticated}
					/>
				</div>
			</section>

			<section className="mb-16">
				<Separator className="mb-16" />
				<CommentList blogId={blog.blog_id} isAuthenticated={isAuthenticated} />
			</section>
		</article>
	);
}
