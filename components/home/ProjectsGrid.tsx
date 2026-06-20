"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { TextureCard } from "@/components/ui/texture-card";
import { projects } from "@/lib/data/home";
import { cn } from "@/lib/utils";
import { containerPx, fadeInView, fadeUp, stagger } from "./constants";

export function ProjectsGrid() {
	return (
		<section className={cn(containerPx, "py-16")}>
			<motion.h2
				{...fadeInView}
				className="text-4xl sm:text-6xl font-display font-extrabold mb-10 text-foreground"
			>
				Featured
			</motion.h2>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-40px" }}
				variants={stagger}
				className="grid grid-cols-1 sm:grid-cols-2 gap-6"
			>
				{projects.map((project, i) => (
					<motion.div key={project.title} variants={fadeUp} custom={i}>
						<Link
							href={project.href}
							className="group block transition-transform duration-300 ease-out hover:scale-[1.02]"
						>
							<TextureCard className="rounded-xl">
								<article className="p-3">
									<div
										className={cn(
											"relative aspect-4/3 rounded-lg overflow-hidden",
											project.color,
										)}
									>
										<div className="absolute inset-0 bg-linear-to-t from-overlay/40 to-transparent z-10" />
										<div className="absolute inset-0 flex items-center justify-center">
											<span className="text-overlay-foreground/30 text-7xl font-display font-extrabold">
												{project.title.charAt(0)}
											</span>
										</div>
									</div>
									<h3 className="text-xl font-semibold mt-4 group-hover:opacity-70 transition-opacity text-foreground">
										{project.title}
									</h3>
									<p className="text-sm text-foreground/60">
										{project.subtitle}
									</p>
								</article>
							</TextureCard>
						</Link>
					</motion.div>
				))}
			</motion.div>
		</section>
	);
}
