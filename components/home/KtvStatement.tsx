"use client";

import {
	type MotionValue,
	motion,
	useScroll,
	useTransform,
} from "motion/react";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { statementChars } from "@/lib/data/home";
import { cn } from "@/lib/utils";
import { containerPx } from "./constants";

const KTV_MOBILE = { start: 0.05, end: 1 };
const KTV_DESKTOP = { start: 0.1, end: 1 };

function KtvChar({
	char,
	progress,
	index,
	total,
	ktvStart,
	ktvEnd,
}: {
	char: string;
	progress: MotionValue<number>;
	index: number;
	total: number;
	ktvStart: number;
	ktvEnd: number;
}) {
	const range = ktvEnd - ktvStart;
	const start = ktvStart + (index / total) * range;
	const end = ktvStart + ((index + 1) / total) * range;

	const opacity = useTransform(progress, (p) => {
		if (p <= start) return 0.1;
		if (p >= end) return 1.0;
		return 0.1 + ((p - start) / (end - start)) * 0.9;
	});

	return <motion.span style={{ opacity }}>{char}</motion.span>;
}

export function KtvStatement() {
	const ref = useRef<HTMLElement>(null);
	const isMobile = useIsMobile();
	const ktv = isMobile ? KTV_MOBILE : KTV_DESKTOP;
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end end"],
	});

	return (
		<section ref={ref} className="relative h-[250vh]">
			<div
				className={cn(
					"sticky top-0 flex items-center justify-center h-[80svh] sm:h-svh",
					containerPx,
				)}
			>
				<p
					key={`${ktv.start}-${ktv.end}`}
					className="text-center text-2xl sm:text-3xl lg:text-4xl leading-snug font-(family-name:--font-crimson-pro) italic text-foreground max-w-4xl"
				>
					{statementChars.map(({ id, char }, i) => (
						<KtvChar
							key={id}
							char={char}
							progress={scrollYProgress}
							index={i}
							total={statementChars.length}
							ktvStart={ktv.start}
							ktvEnd={ktv.end}
						/>
					))}
				</p>
			</div>
		</section>
	);
}
