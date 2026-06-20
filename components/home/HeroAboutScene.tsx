"use client";

import { ArrowUpRight, Sparkles, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { WordRotate } from "@/components/ui/word-rotate";
import { useBreakpointValue } from "@/hooks/useIsMobile";
import { CURRENT_YEAR, fadeUp, primaryButtonClass, stagger } from "./constants";

const CARD_BREAK = 0.5;
const CARD_START = 0.7;

export function HeroAboutScene() {
	const aboutRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: aboutRef,
		offset: ["start start", "end end"],
	});

	const cardScale = useTransform(scrollYProgress, (p) =>
		p >= CARD_BREAK ? 1 : CARD_START + (p / CARD_BREAK) * (1 - CARD_START),
	);
	const cardRotateY = useTransform(scrollYProgress, (p) =>
		p >= CARD_BREAK ? 180 : (p / CARD_BREAK) * 180,
	);
	const cardRadius = useTransform(
		scrollYProgress,
		[0, 1],
		["0.375rem", "0.5rem"],
	);
	const heroOpacity = useTransform(scrollYProgress, (p) =>
		Math.max(0, 1 - p / 0.12),
	);
	const heroY = useTransform(
		scrollYProgress,
		(p) => -120 * Math.min(1, p / 0.12),
	);
	const aboutProgress = (p: number) =>
		Math.max(0, Math.min(1, (p - 0.5) / 0.28));
	const aboutOpacity = useTransform(scrollYProgress, aboutProgress);
	const aboutY = useTransform(
		scrollYProgress,
		(p) => 40 * (1 - aboutProgress(p)),
	);
	const cardStartY = useBreakpointValue(768, 0, 220);
	const cardTranslateY = useTransform(
		scrollYProgress,
		(p) => cardStartY * (1 - Math.max(0, Math.min(1, (p - 0.18) / 0.37))),
	);

	return (
		<section
			ref={aboutRef}
			aria-label="Hero and About"
			className="relative h-[260vh]"
		>
			<div
				className="sticky top-0 h-svh overflow-hidden"
				style={{ perspective: 1200 }}
			>
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 pb-[6svh] md:pb-0">
					<motion.div
						style={{
							scale: cardScale,
							rotateY: cardRotateY,
							borderRadius: cardRadius,
							y: cardTranslateY,
						}}
						className="aspect-3/4 h-[23svh] overflow-hidden sm:h-[28svh] md:h-auto md:w-[320px]"
					>
						<Image
							src="/avatar.jpg"
							alt="CHJ"
							width={320}
							height={427}
							priority
							className="size-full object-cover"
						/>
					</motion.div>
				</div>

				<motion.div
					style={{ opacity: heroOpacity, y: heroY }}
					className="absolute inset-0 flex flex-col px-6 pt-16 pb-10 sm:px-10 sm:pt-20 lg:px-16"
				>
					<motion.div initial="hidden" animate="visible" variants={stagger}>
						<div className="relative text-center">
							<Sparkles
								aria-hidden="true"
								className="absolute -top-6 left-[5%] size-14 text-foreground sm:size-20"
							/>
							<h1 className="font-display text-[clamp(2.5rem,min(12vw,19svh),11rem)] leading-[0.95] tracking-wide text-foreground uppercase">
								<motion.span variants={fadeUp} custom={0} className="block">
									SOFTWARE
								</motion.span>
								<motion.span variants={fadeUp} custom={1} className="block">
									ENGINEER
								</motion.span>
							</h1>
							<Zap
								aria-hidden="true"
								className="absolute -bottom-2 right-[8%] size-12 -rotate-12 text-foreground sm:size-16"
							/>
						</div>
						<motion.div
							variants={fadeUp}
							custom={2}
							className="mt-4 hidden text-center sm:block"
						>
							<WordRotate
								words={["Frontend", "Backend", "AI Agent"]}
								className="font-display text-xl uppercase tracking-[0.15em] text-foreground/50 sm:text-2xl"
							/>
						</motion.div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.6 }}
						className="mt-auto flex items-end justify-between text-foreground"
					>
						<p className="font-display text-2xl font-bold sm:text-4xl">
							&copy;{CURRENT_YEAR}
						</p>
						<p className="text-xs tracking-[0.2em] uppercase opacity-70 sm:text-sm">
							/Blogging Since 2024
						</p>
					</motion.div>
				</motion.div>

				<motion.div
					style={{ opacity: aboutOpacity, y: aboutY }}
					className="absolute inset-0 flex items-end justify-center px-6 pb-12 sm:px-10 md:items-center md:pb-0 lg:px-16"
				>
					<div className="grid w-full grid-cols-1 items-center gap-3 md:grid-cols-[1fr_320px_1fr] md:gap-10 lg:gap-16">
						<div className="md:text-right">
							<h2 className="mb-2 font-display text-3xl font-extrabold text-foreground sm:mb-4 sm:text-6xl">
								Hey!
							</h2>
							<p className="text-xs leading-snug text-foreground/80 sm:text-base sm:leading-relaxed">
								我是 CHJ，一名全栈开发者与技术写作者。目前专注于 Web
								开发和开源项目，在这个博客记录我的技术探索和思考。
							</p>
						</div>

						<div aria-hidden className="hidden md:block" />

						<div className="space-y-3 md:space-y-5">
							<p className="text-xs leading-snug text-foreground/70 sm:text-sm sm:leading-relaxed">
								热爱构建现代化、高性能的 Web
								应用。多年来一直在探索前端与后端的最佳实践，并通过博客分享我的经验和见解。
							</p>
							<Button asChild className={primaryButtonClass}>
								<Link href="/about">
									Get Started <ArrowUpRight className="size-4" />
								</Link>
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
