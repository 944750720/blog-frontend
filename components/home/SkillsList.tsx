"use client";

import { motion } from "motion/react";
import { skills } from "@/lib/data/home";
import { cn } from "@/lib/utils";
import { containerPx, fadeUp, stagger } from "./constants";

export function SkillsList() {
	return (
		<section className={cn(containerPx, "py-16")}>
			<h2 className="sr-only">Skills</h2>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, margin: "-80px" }}
				variants={stagger}
			>
				{skills.map((skill, i) => (
					<motion.div
						key={skill.category}
						variants={fadeUp}
						custom={i}
						className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-t border-foreground/15 gap-3"
					>
						<h3 className="text-lg sm:text-xl font-semibold text-foreground">
							{skill.category}
						</h3>
						<div className="flex flex-wrap gap-2">
							{skill.tags.map((tag, tagIndex) => (
								<span key={tag} className="text-sm text-foreground/60">
									{tag}
									{tagIndex < skill.tags.length - 1 && (
										<span className="ml-2">·</span>
									)}
								</span>
							))}
						</div>
					</motion.div>
				))}
				<div className="border-t border-foreground/15" />
			</motion.div>
		</section>
	);
}
