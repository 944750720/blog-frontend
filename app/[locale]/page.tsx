import { Rss } from "lucide-react";
import Link from "next/link";
import { ContactCta } from "@/components/home/ContactCta";
import { CURRENT_YEAR, containerPx } from "@/components/home/constants";
import { HeroAboutScene } from "@/components/home/HeroAboutScene";
import { KtvStatement } from "@/components/home/KtvStatement";
import { ProjectsGrid } from "@/components/home/ProjectsGrid";
import { SkillsList } from "@/components/home/SkillsList";
import { GithubIcon } from "@/components/icons/lucide-github";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function Home() {
	return (
		<div className="relative isolate -mx-4 sm:-mx-7 lg:-mx-10 bg-cream dark:bg-background">
			<div className="relative z-10">
				<HeroAboutScene />
				<KtvStatement />
				<SkillsList />
				<ProjectsGrid />
				<ContactCta />

				{/* Social Icons */}
				<nav aria-label="Social links" className={cn(containerPx, "pb-10")}>
					<div className="flex items-center gap-4">
						{siteConfig.footer.social.github && (
							<a
								href={siteConfig.footer.social.github}
								target="_blank"
								rel="noopener noreferrer"
								className="text-foreground/50 hover:text-foreground transition-colors"
								aria-label="GitHub"
							>
								<GithubIcon className="size-5" />
							</a>
						)}
						<a
							href="/blog"
							className="text-foreground/50 hover:text-foreground transition-colors"
							aria-label="RSS Feed"
						>
							<Rss className="size-5" />
						</a>
					</div>
				</nav>

				{/* Dark Footer */}
				<footer
					className={cn(
						"relative isolate overflow-hidden bg-foreground dark:bg-footer-dark text-background dark:text-foreground py-16",
						containerPx,
					)}
				>
					<div className="relative z-10 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12">
						<h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-tight">
							Building
							<br />
							Ideas Into
							<br />
							Reality.
						</h2>

						<div>
							<h3 className="text-sm font-medium opacity-50 mb-4">
								/Quick links
							</h3>
							<nav aria-label="Quick links" className="flex flex-wrap gap-2">
								{siteConfig.header.menu.map((item) => (
									<Badge
										key={item.link}
										variant="outline"
										className="border-transparent bg-cream text-cream-foreground hover:bg-cream/90 cursor-pointer rounded-full px-4 h-auto py-2 text-sm"
										asChild
									>
										<Link href={item.link}>{item.title}</Link>
									</Badge>
								))}
							</nav>
						</div>

						<div>
							<h3 className="text-sm font-medium opacity-50 mb-4">/Contact</h3>
							<p className="text-sm opacity-70">{siteConfig.email}</p>
						</div>
					</div>
					<div className="relative z-10 mt-12 flex flex-col gap-3 border-t border-background/15 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between dark:border-foreground/15">
						<span className="opacity-60">
							&copy; {CURRENT_YEAR} {siteConfig.title}
						</span>
						<div className="flex items-center gap-4">
							{siteConfig.footer.links.map((link) => (
								<Link
									key={link.link}
									href={link.link}
									className="opacity-60 underline-offset-4 transition-opacity hover:underline hover:opacity-100"
								>
									{link.title}
								</Link>
							))}
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
}
