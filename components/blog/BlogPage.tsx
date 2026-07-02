"use client";

import { FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import useSWR from "swr";
import type { BlogListItem } from "@/app/types/blog";
import type { PaginatedResponse } from "@/app/types/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils/date";

function BlogCardSkeleton() {
	return (
		<Card className="overflow-hidden">
			<Skeleton className="h-48 w-full rounded-none" />
			<CardHeader className="pb-2">
				<Skeleton className="h-6 w-3/4" />
				<Skeleton className="h-4 w-full mt-2" />
			</CardHeader>
			<CardContent>
				<div className="flex gap-2">
					<Skeleton className="h-5 w-16" />
					<Skeleton className="h-5 w-16" />
				</div>
			</CardContent>
		</Card>
	);
}

export function BlogPage() {
	const locale = useLocale();
	const t = useTranslations("common");
	const blogT = useTranslations("blog");
	const [currentPage, setCurrentPage] = useState(1);

	const { data, isLoading, error } = useSWR<PaginatedResponse<BlogListItem>>([
		`/api/v1/blogs?page=${currentPage}&limit=6&is_published=true`,
		locale,
	]);

	if (isLoading) {
		return (
			<div className="max-w-4xl mx-auto px-3 py-12">
				<div className="text-center mb-16">
					<Skeleton className="h-10 w-48 mx-auto mb-4" />
					<Skeleton className="h-6 w-96 mx-auto" />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{["a", "b", "c", "d"].map((id) => (
						<BlogCardSkeleton key={id} />
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="max-w-4xl mx-auto px-3 py-12 text-center">
				<p className="text-destructive">{t("loadFailed")}</p>
				<p className="text-muted-foreground mt-2">{t("loadFailedMessage")}</p>
			</div>
		);
	}

	const blogs = data?.data ?? [];
	const isEmpty = blogs.length === 0;

	return (
		<section className="max-w-4xl mx-auto px-3 py-12">
			<header className="text-center mb-16">
				<h1 className="text-4xl mb-4 text-foreground font-bold">
					{blogT("title")}
				</h1>
				<p className="text-lg max-w-2xl mx-auto leading-relaxed text-muted-foreground">
					{blogT("description")}
				</p>
				<Separator className="max-w-2xl mx-auto mt-8" />
			</header>

			{isEmpty ? (
				<div className="text-center py-16">
					<FileText
						className="w-12 h-12 mx-auto text-muted-foreground mb-4"
						aria-hidden="true"
					/>
					<p className="text-foreground font-medium">{t("notFound")}</p>
					<p className="text-muted-foreground mt-1">{t("notFoundMessage")}</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
						{blogs.map((blog) => (
							<Link
								key={blog.blog_id}
								href={`/${locale}/blog/${blog.blog_slug}`}
								className="group"
							>
								<Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
									{blog.cover_url && (
										<div className="relative h-48 overflow-hidden">
											<Image
												src={blog.cover_url}
												alt={blog.blog_title}
												fill
												className="object-cover group-hover:scale-105 transition-transform duration-300"
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										</div>
									)}
									<CardHeader className="pb-2">
										<CardTitle className="line-clamp-2 text-lg">
											{blog.blog_title}
										</CardTitle>
										<CardDescription className="line-clamp-2">
											{blog.blog_description}
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="flex flex-wrap gap-2 mb-3">
											{blog.blog_tags?.map((tag) => (
												<Badge
													key={tag.tag_id}
													variant="secondary"
													className="text-xs"
												>
													{tag.tag_title}
												</Badge>
											))}
										</div>
										<div className="flex items-center justify-between text-xs text-muted-foreground">
											<span>{formatDate(blog.created_at, locale)}</span>
											{blog.blog_stats && (
												<div className="flex items-center gap-3">
													<span>
														{blog.blog_stats.views} {blogT("views")}
													</span>
													<span>
														{blog.blog_stats.likes} {blogT("likes")}
													</span>
												</div>
											)}
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>

					{data && data.totalPages > 1 && (
						<div className="flex justify-center gap-2">
							<Button
								variant="outline"
								size="sm"
								disabled={currentPage <= 1}
								onClick={() => setCurrentPage((p) => p - 1)}
							>
								{blogT("previousPost")}
							</Button>
							<span className="flex items-center px-4 text-sm text-muted-foreground">
								{currentPage} / {data.totalPages}
							</span>
							<Button
								variant="outline"
								size="sm"
								disabled={currentPage >= data.totalPages}
								onClick={() => setCurrentPage((p) => p + 1)}
							>
								{blogT("nextPost")}
							</Button>
						</div>
					)}
				</>
			)}
		</section>
	);
}
