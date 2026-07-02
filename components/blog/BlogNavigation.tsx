"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import useSWR from "swr";

import type { BlogNavigationResponse } from "@/app/types/blog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogNavigationProps {
	blogId: number;
}

export default function BlogNavigation({ blogId }: BlogNavigationProps) {
	const locale = useLocale();
	const t = useTranslations("blog");
	const { data, isLoading, error } = useSWR<BlogNavigationResponse>(
		`/api/v1/blogs/${blogId}/navigation`,
	);

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<Skeleton className="h-16" />
				<Skeleton className="h-16" />
			</div>
		);
	}

	if (error || !data) return null;
	if (!data.previous && !data.next) return null;

	return (
		<nav className="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div className="group">
				{data.previous ? (
					<Button
						variant="outline"
						size="lg"
						className="h-16 w-full justify-start gap-3 p-4"
						asChild
					>
						<Link href={`/${locale}/blog/${data.previous.blog_slug}`}>
							<ArrowLeft
								className="size-5 text-primary transition-transform duration-200 group-hover:-translate-x-1"
								aria-hidden="true"
							/>
							<div className="flex min-w-0 flex-1 flex-col items-start">
								<span className="text-xs text-muted-foreground">
									{t("previousPost")}
								</span>
								<span className="max-w-[200px] truncate text-sm font-medium">
									{data.previous.blog_title}
								</span>
							</div>
						</Link>
					</Button>
				) : (
					<div className="flex h-16 w-full items-center justify-center rounded-4xl border border-dashed border-border text-sm text-muted-foreground">
						{t("previousPost")}
					</div>
				)}
			</div>

			<div className="group">
				{data.next ? (
					<Button
						variant="outline"
						size="lg"
						className="h-16 w-full justify-end gap-3 p-4"
						asChild
					>
						<Link href={`/${locale}/blog/${data.next.blog_slug}`}>
							<div className="flex min-w-0 flex-1 flex-col items-end">
								<span className="text-xs text-muted-foreground">
									{t("nextPost")}
								</span>
								<span className="max-w-[200px] truncate text-sm font-medium">
									{data.next.blog_title}
								</span>
							</div>
							<ArrowRight
								className="size-5 text-primary transition-transform duration-200 group-hover:translate-x-1"
								aria-hidden="true"
							/>
						</Link>
					</Button>
				) : (
					<div className="flex h-16 w-full items-center justify-center rounded-4xl border border-dashed border-border text-sm text-muted-foreground">
						{t("nextPost")}
					</div>
				)}
			</div>
		</nav>
	);
}
