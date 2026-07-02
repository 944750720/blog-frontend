"use client";

import { useEffect, useRef } from "react";

import type { BlogAudioResponse } from "@/app/types/blog";

interface BlogAudioProps {
	shouldPlay: boolean;
	onPlayStateChange: (isPlaying: boolean) => void;
	audioData: BlogAudioResponse;
}

export default function BlogAudio({
	shouldPlay,
	onPlayStateChange,
	audioData,
}: BlogAudioProps) {
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		if (!audioData.tts || !audioRef.current) return;

		if (shouldPlay) {
			audioRef.current.play().catch(() => {
				onPlayStateChange(false);
			});
		} else {
			audioRef.current.pause();
		}
	}, [shouldPlay, audioData.tts, onPlayStateChange]);

	if (!audioData.tts) return null;

	return (
		// biome-ignore lint/a11y/useMediaCaption: hidden audio player, no visual captions needed
		<audio
			ref={audioRef}
			src={audioData.tts}
			onPlay={() => onPlayStateChange(true)}
			onPause={() => onPlayStateChange(false)}
			onEnded={() => onPlayStateChange(false)}
			onError={() => onPlayStateChange(false)}
		/>
	);
}
