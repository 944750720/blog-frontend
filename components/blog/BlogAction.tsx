"use client";

import { AudioLines, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import useSWR from "swr";
import type { BlogAudioResponse, BlogSummaryResponse } from "@/app/types/blog";
import { Button } from "@/components/ui/button";
import BlogAudio from "./BlogAudio";
import BlogSummaryModal from "./BlogSummaryModal";

interface BlogActionProps {
	blogId: number;
}

function AudioWaveIcon({ isPlaying }: { isPlaying: boolean }) {
	if (!isPlaying) return <AudioLines className="size-4" />;

	return (
		<div className="flex size-4 items-center gap-0.5">
			{[0, 1, 2, 3].map((i) => (
				<motion.div
					key={`wave-${i}`}
					className="w-0.5 rounded-full bg-current"
					animate={{ height: [4, 12, 4, 8, 16, 4, 12, 4] }}
					transition={{
						duration: 0.8,
						repeat: Number.POSITIVE_INFINITY,
						delay: i * 0.1,
						ease: "easeInOut",
					}}
				/>
			))}
		</div>
	);
}

export default function BlogAction({ blogId }: BlogActionProps) {
	const commonT = useTranslations("common");
	const blogT = useTranslations("blog");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [playState, setPlayState] = useState<"stopped" | "playing" | "paused">(
		"stopped",
	);

	const { data: summaryData, error: summaryError } =
		useSWR<BlogSummaryResponse>(`/api/v1/blogs/${blogId}/summary`, {
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		});

	const { data: audioData, error: audioError } = useSWR<BlogAudioResponse>(
		`/api/v1/blogs/${blogId}/tts`,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	);

	const hasSummary = !summaryError && summaryData?.summary;
	const hasAudio = !audioError && audioData?.tts;

	const handleAudioToggle = () => {
		if (playState === "stopped") setPlayState("playing");
		else if (playState === "playing") setPlayState("paused");
		else setPlayState("playing");
	};

	const handlePlayStateChange = (playing: boolean) => {
		if (!playing && playState === "playing") setPlayState("stopped");
	};

	if (!hasSummary && !hasAudio) return null;

	const audioLabel =
		playState === "playing"
			? blogT("action.audio.pause")
			: playState === "paused"
				? blogT("action.audio.resume")
				: blogT("action.audio.play");

	const audioDescription =
		playState === "playing"
			? blogT("action.audio.pauseDescription")
			: playState === "paused"
				? blogT("action.audio.resumeDescription")
				: blogT("action.audio.playDescription");

	return (
		<div className="mx-auto flex w-full max-w-md flex-col gap-4 sm:flex-row">
			{hasSummary && (
				<Button
					variant="default"
					size="lg"
					className="h-auto flex-1 gap-3 p-4"
					onClick={() => setIsModalOpen(true)}
					aria-label={blogT("action.summarySubtitle")}
				>
					<Sparkles className="size-5" aria-hidden="true" />
					<div className="text-left">
						<div className="font-semibold">{commonT("summary")}</div>
						<div className="text-xs opacity-90">
							{blogT("action.summarySubtitle")}
						</div>
					</div>
				</Button>
			)}

			{hasAudio && (
				<Button
					variant={playState === "playing" ? "default" : "outline"}
					size="lg"
					className="h-auto flex-1 gap-3 p-4"
					onClick={handleAudioToggle}
					aria-label={audioLabel}
				>
					<span aria-hidden="true">
						<AudioWaveIcon isPlaying={playState === "playing"} />
					</span>
					<div className="text-left">
						<div className="font-semibold">{audioLabel}</div>
						<div className="text-xs opacity-90">{audioDescription}</div>
					</div>
				</Button>
			)}

			{hasAudio && audioData && (
				<BlogAudio
					shouldPlay={playState === "playing"}
					onPlayStateChange={handlePlayStateChange}
					audioData={audioData}
				/>
			)}

			{hasSummary && summaryData && (
				<BlogSummaryModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					summaryData={summaryData}
				/>
			)}
		</div>
	);
}
