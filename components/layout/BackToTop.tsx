"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function BackToTop() {
	const { show, progress } = useScrollProgress();

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (!show) return null;

	const circumference = 2 * Math.PI * 18;
	const offset = circumference - (progress / 100) * circumference;

	return (
		<Button
			size="icon"
			variant="outline"
			className="fixed bottom-6 right-6 z-50 hidden md:block rounded-full shadow-lg size-12"
			onClick={scrollToTop}
			aria-label="Back to top"
		>
			<svg
				className="absolute inset-0 size-12 -rotate-90"
				viewBox="0 0 40 40"
				role="img"
				aria-label="Scroll progress"
			>
				<circle
					cx="20"
					cy="20"
					r="18"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					className="text-muted"
				/>
				<circle
					cx="20"
					cy="20"
					r="18"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					className="text-primary transition-all duration-150"
				/>
			</svg>
			<ArrowUp className="size-4 relative z-10" />
		</Button>
	);
}
