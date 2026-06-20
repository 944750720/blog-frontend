import type { Variants } from "motion/react";

export const CURRENT_YEAR = new Date().getFullYear();

export const containerPx = "px-6 sm:px-10 lg:px-16";

export const primaryButtonClass =
	"rounded-full gap-2 bg-foreground text-background hover:bg-foreground/90 dark:bg-cream-foreground dark:text-cream dark:hover:bg-cream-foreground/90";

export const fadeInView = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: false },
	transition: { duration: 0.6 },
} as const;

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			delay: i * 0.1,
			ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
		},
	}),
};

export const stagger: Variants = {
	visible: { transition: { staggerChildren: 0.08 } },
};
