"use client";

import { Mail } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { containerPx, fadeInView, primaryButtonClass } from "./constants";

export function ContactCta() {
	return (
		<section className={cn(containerPx, "py-20")}>
			<motion.div {...fadeInView}>
				<h2 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold text-foreground">
					Let&apos;s talk.
				</h2>
				<p className="mt-4 text-foreground/60 max-w-lg">
					Available for remote work and freelance projects. Let&apos;s discuss
					how I can help with your project.
				</p>
				<Button asChild className={cn("mt-6", primaryButtonClass)}>
					<Link href="/about">
						<Mail className="size-4" /> Get in Touch
					</Link>
				</Button>
			</motion.div>
		</section>
	);
}
