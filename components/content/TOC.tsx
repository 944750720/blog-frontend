"use client";

import { BookOpen, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
	id: string;
	text: string;
	level: number;
}

export function TOC() {
	const t = useTranslations("content");
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [tocItems, setTocItems] = useState<TOCItem[]>([]);
	const [activeItem, setActiveItem] = useState("");

	useEffect(() => {
		const extractHeadings = (): TOCItem[] => {
			const headings: TOCItem[] = [];
			const elements = document.querySelectorAll(
				"h1[data-id], h2[data-id], h3[data-id]",
			);
			for (const element of elements) {
				const dataId = element.getAttribute("data-id");
				const text = element.textContent?.trim() || "";
				const level = Number.parseInt(element.tagName.charAt(1), 10);
				if (dataId && text && level >= 1 && level <= 3) {
					headings.push({ id: dataId, text, level });
				}
			}
			return headings;
		};

		const handleScroll = () => {
			const elements = document.querySelectorAll(
				"h1[data-id], h2[data-id], h3[data-id]",
			);
			let current = "";
			const scrollPosition = window.scrollY + 100;
			for (const element of elements) {
				const rect = element.getBoundingClientRect();
				const elementTop = rect.top + window.scrollY;
				if (elementTop <= scrollPosition) {
					current = element.getAttribute("data-id") || "";
				}
			}
			setActiveItem(current);
		};

		setTocItems(extractHeadings());

		const observer = new MutationObserver(() => {
			setTocItems(extractHeadings());
		});
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	if (tocItems.length === 0) return null;

	return (
		<nav
			className="bg-background border rounded-sm p-6 mb-6"
			aria-label={t("toc")}
		>
			<button
				type="button"
				className="flex w-full items-center justify-between cursor-pointer group"
				onClick={() => setIsCollapsed(!isCollapsed)}
				aria-label={isCollapsed ? t("tocExpand") : t("tocCollapse")}
			>
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-sm bg-muted group-hover:bg-accent transition-colors">
						<BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
					</div>
					<h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
						{t("toc")}
					</h2>
				</div>
				<motion.div
					animate={{ rotate: isCollapsed ? 0 : 180 }}
					transition={{ duration: 0.3 }}
					className="p-1 rounded-sm hover:bg-muted transition-colors"
				>
					<ChevronDown className="w-5 h-5 text-foreground" aria-hidden="true" />
				</motion.div>
			</button>

			<AnimatePresence>
				{!isCollapsed && (
					<motion.ul
						className="space-y-1 mt-5 list-none"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
					>
						{tocItems.map((item) => {
							const isActive = activeItem === item.id;
							return (
								<button
									type="button"
									key={item.id}
									className={cn(
										"relative w-full text-left cursor-pointer rounded-md transition-colors",
										{
											"py-3 px-4 font-semibold text-foreground text-sm":
												item.level === 1,
											"py-2.5 px-4 ml-6 font-medium text-foreground text-sm":
												item.level === 2,
											"py-2 px-4 ml-10 text-muted-foreground text-xs":
												item.level === 3,
										},
										{
											"bg-primary/10": isActive,
											"hover:bg-muted": !isActive,
										},
									)}
									onClick={() => {
										const element = document.querySelector(
											`[data-id="${CSS.escape(item.id)}"]`,
										);
										element?.scrollIntoView({
											behavior: "smooth",
											block: "start",
										});
									}}
								>
									{isActive && (
										<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
									)}
									<div className="flex items-center gap-3">
										<div
											className={cn(
												"shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
												{
													"bg-primary/20 text-primary":
														item.level === 1 || isActive,
													"bg-muted text-muted-foreground":
														item.level === 2 && !isActive,
													"bg-muted text-muted-foreground/70":
														item.level === 3 && !isActive,
												},
											)}
										>
											{item.level}
										</div>
										<span
											className={cn(
												"flex-1 line-clamp-2 leading-relaxed transition-colors",
												{
													"text-primary font-semibold": isActive,
												},
											)}
										>
											{item.text}
										</span>
									</div>
								</button>
							);
						})}
					</motion.ul>
				)}
			</AnimatePresence>
		</nav>
	);
}
