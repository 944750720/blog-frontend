"use client";

import { RotateCw, X, ZoomIn, ZoomOut } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ImagePreviewProps {
	isOpen: boolean;
	imageUrl: string;
	imageAlt?: string;
	onClose: () => void;
}

export function ImagePreview({
	isOpen,
	imageUrl,
	imageAlt,
	onClose,
}: ImagePreviewProps) {
	const t = useTranslations("content.imagePreview");
	const [scale, setScale] = useState(1);
	const [rotation, setRotation] = useState(0);

	useEffect(() => {
		if (isOpen) {
			setScale(1);
			setRotation(0);
		}
	}, [isOpen]);

	const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
	const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
	const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
	const handleReset = () => {
		setScale(1);
		setRotation(0);
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="max-w-6xl w-full h-[90vh] sm:h-[85vh] p-0 gap-0 flex flex-col overflow-hidden [&>button]:hidden">
				<DialogTitle className="sr-only">{imageAlt}</DialogTitle>

				<div className="flex items-center justify-between gap-2 sm:gap-4 bg-card border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0">
					<div className="hidden md:flex items-center gap-2 min-w-0 flex-1">
						<h2 className="text-base sm:text-lg font-semibold text-foreground truncate">
							{imageAlt}
						</h2>
					</div>

					<div className="flex items-center gap-0.5 sm:gap-1 flex-1 justify-center md:justify-start md:flex-initial">
						<button
							type="button"
							onClick={handleZoomOut}
							disabled={scale <= 0.5}
							className="p-1.5 sm:p-2 rounded-sm bg-background text-muted-foreground hover:bg-muted border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							aria-label={t("zoomOut")}
						>
							<ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
						</button>
						<span className="text-xs sm:text-sm text-foreground min-w-[45px] sm:min-w-[60px] text-center font-mono">
							{Math.round(scale * 100)}%
						</span>
						<button
							type="button"
							onClick={handleZoomIn}
							disabled={scale >= 3}
							className="p-1.5 sm:p-2 rounded-sm bg-background text-muted-foreground hover:bg-muted border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							aria-label={t("zoomIn")}
						>
							<ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
						</button>
						<div className="w-px h-4 sm:h-6 bg-border mx-1 sm:mx-2" />
						<button
							type="button"
							onClick={handleRotate}
							className="p-1.5 sm:p-2 rounded-sm bg-background text-muted-foreground hover:bg-muted border transition-colors"
							aria-label={t("rotate")}
						>
							<RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
						</button>
						<div className="w-px h-4 sm:h-6 bg-border mx-1 sm:mx-2" />
						<button
							type="button"
							onClick={handleReset}
							disabled={scale === 1 && rotation === 0}
							className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-sm bg-background text-muted-foreground hover:bg-muted border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							aria-label={t("reset")}
						>
							{t("reset")}
						</button>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="p-1.5 sm:p-2 rounded-sm bg-background text-muted-foreground hover:bg-destructive/10 hover:text-destructive border shrink-0 transition-colors"
						aria-label={t("close")}
					>
						<X className="w-4 h-4 sm:w-5 sm:h-5" />
					</button>
				</div>

				<div className="flex-1 overflow-auto bg-muted flex items-center justify-center p-4 sm:p-6">
					<motion.div
						animate={{ scale, rotate: rotation }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="flex items-center justify-center relative w-full h-full"
					>
						<Image
							src={imageUrl}
							alt={imageAlt ?? ""}
							fill
							className="object-contain rounded-sm select-none"
							draggable={false}
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 90vw"
							quality={100}
							priority
						/>
					</motion.div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
