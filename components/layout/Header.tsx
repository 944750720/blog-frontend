"use client";

import { Menu, Search } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
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
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Header() {
	const { isNotTop, show } = useScrollDirection();
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<motion.header
			className="sticky top-4 z-50"
			animate={{ y: show ? 0 : -80 }}
			transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
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
					<ThemeSwitcher />

					{/* Language toggle */}
					<LanguageSwitcher />

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
		</motion.header>
	);
}
