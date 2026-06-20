"use client";

import Link from "next/link";
import { GithubIcon } from "@/components/icons/lucide-github";
import { usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/config";

export function Footer() {
	const pathname = usePathname();
	if (pathname === "/") return null;

	return (
		<footer className="mx-auto mb-5 mt-16 w-full">
			<div className="border-t pt-5 flex items-center gap-y-3 max-sm:flex-col sm:justify-between">
				{/* Left: links + copyright */}
				<div className="text-muted-foreground text-sm flex-wrap flex items-center gap-x-1">
					{siteConfig.footer.links.map((link, i) => (
						<span key={link.link} className="flex items-center gap-x-1">
							{i > 0 && <span>·</span>}
							<Link
								href={link.link}
								className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
							>
								{link.title}
							</Link>
						</span>
					))}
					<span className="ml-1">
						&copy; {new Date().getFullYear()} {siteConfig.title}
					</span>
				</div>

				{/* Right: social icons */}
				<div className="flex items-center gap-x-2">
					{siteConfig.footer.social.github && (
						<a
							href={siteConfig.footer.social.github}
							target="_blank"
							rel="noopener noreferrer me"
							className="text-muted-foreground hover:text-foreground transition-colors"
							aria-label="GitHub"
						>
							<GithubIcon className="size-5" />
						</a>
					)}
				</div>
			</div>
		</footer>
	);
}
