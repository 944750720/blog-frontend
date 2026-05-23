"use client";

import { Languages, Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useThemeCycle } from "@/hooks/useThemeCycle";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Header() {
	const { theme, cycleTheme, ThemeIcon } = useThemeCycle();
	const { isNotTop, show } = useScrollDirection();
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState(false);

	const switchLocale = () => {
		const next = locale === "zh" ? "en" : "zh";
		const segments = pathname.split("/");
		// pathname starts with /zh or /en
		if (segments[1] === "zh" || segments[1] === "en") {
			segments[1] = next;
		}
		router.push(segments.join("/"));
	};

	return (
		<header
			className="sticky top-4 z-50 transition-all duration-300"
			style={{
				transform: show ? "translateY(0)" : "translateY(-5rem)",
			}}
		>
			<div
				className={cn(
					"flex items-center justify-between rounded-2xl px-4 py-2 transition-all duration-300",
					{
						"border border-border bg-background/80 backdrop-blur shadow-sm md:mx-[8%]":
							isNotTop,
						"border border-transparent": !isNotTop,
					},
				)}
			>
				{/* Brand */}
				<Link
					href="/"
					className="font-semibold text-lg hover:opacity-80 transition-opacity"
				>
					{siteConfig.title}
				</Link>

				{/* Right side */}
				<div className="flex items-center gap-x-1">
					{/* Desktop nav */}
					<nav className="hidden sm:flex items-center gap-x-1">
						{siteConfig.header.menu.map((item) => (
							<Link
								key={item.link}
								href={item.link}
								className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
							>
								{item.title}
							</Link>
						))}
					</nav>

					{/* Search */}
					<Button variant="ghost" size="icon" asChild>
						<Link href="/search" aria-label="Search">
							<Search className="size-4" />
						</Link>
					</Button>

					{/* Theme toggle */}
					<Button
						variant="ghost"
						size="icon"
						onClick={cycleTheme}
						aria-label={`Theme: ${theme}`}
					>
						<ThemeIcon className="size-4" />
					</Button>

					{/* Language toggle */}
					<Button
						variant="ghost"
						size="icon"
						onClick={switchLocale}
						aria-label="Switch language"
					>
						<Languages className="size-4" />
					</Button>

					{/* Mobile menu */}
					<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="sm:hidden"
								aria-label="Menu"
							>
								<Menu className="size-4" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[250px]">
							<SheetHeader>
								<SheetTitle>{siteConfig.title}</SheetTitle>
							</SheetHeader>
							<nav className="flex flex-col gap-y-2 mt-6">
								{siteConfig.header.menu.map((item) => (
									<Link
										key={item.link}
										href={item.link}
										onClick={() => setMobileOpen(false)}
										className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
									>
										{item.title}
									</Link>
								))}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
