"use client";

import { useTranslations } from "next-intl";

import type { BlogSummaryResponse } from "@/app/types/blog";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { TypingAnimation } from "@/components/ui/typing-animation";

interface BlogSummaryModalProps {
	isOpen: boolean;
	onClose: () => void;
	summaryData: BlogSummaryResponse;
}

export default function BlogSummaryModal({
	isOpen,
	onClose,
	summaryData,
}: BlogSummaryModalProps) {
	const commonT = useTranslations("common");
	const blogT = useTranslations("blog");

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>{commonT("summary")}</DialogTitle>
					<DialogDescription>
						{blogT("action.summarySubtitle")}
					</DialogDescription>
				</DialogHeader>
				<div className="mt-4">
					{isOpen && summaryData?.summary && (
						<TypingAnimation
							as="p"
							className="leading-relaxed text-foreground"
							duration={20}
							startOnView={false}
							showCursor={true}
							cursorStyle="line"
						>
							{summaryData.summary}
						</TypingAnimation>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
