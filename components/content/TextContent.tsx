"use client";

import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import UniqueID from "@tiptap/extension-unique-id";
import { EditorContent, type JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useMemo, useState } from "react";
import { Audio } from "@/lib/extensions/audio";
import { CodeBlock } from "@/lib/extensions/code-block";
import { Image } from "@/lib/extensions/image";
import { Video } from "@/lib/extensions/video";
import { ImagePreview } from "./ImagePreview";

export function TextContent({ content }: { content: JSONContent | string }) {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [previewImageUrl, setPreviewImageUrl] = useState("");
	const [previewImageAlt, setPreviewImageAlt] = useState<string | undefined>();

	const parsedContent = useMemo(() => {
		return typeof content === "string" ? JSON.parse(content) : content;
	}, [content]);

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				codeBlock: false,
				horizontalRule: false,
			}),
			CodeBlock,
			HorizontalRule.configure({
				HTMLAttributes: { class: "horizontal-rule" },
			}),
			Table.configure({
				resizable: false,
				HTMLAttributes: { class: "markdown-table" },
			}),
			TableRow,
			TableHeader,
			TableCell,
			TaskList.configure({
				HTMLAttributes: { class: "task-list" },
			}),
			TaskItem.configure({
				nested: true,
				HTMLAttributes: { class: "task-item" },
			}),
			TextAlign.configure({
				types: ["heading", "paragraph", "image", "video", "audio"],
				alignments: ["left", "center", "right", "justify"],
			}),
			UniqueID.configure({ types: ["heading"] }),
			Video,
			Audio,
			Image,
		],
		content: parsedContent,
		editable: false,
		immediatelyRender: false,
		editorProps: {
			handleClick(_view, _pos, event) {
				const target = event.target as HTMLElement;
				if (target.tagName === "IMG") {
					const img = target as HTMLImageElement;
					setPreviewImageUrl(img.src);
					setPreviewImageAlt(img.alt || undefined);
					setIsPreviewOpen(true);
					return true;
				}
				return false;
			},
		},
	});

	useEffect(() => {
		if (!editor) return;

		const disableAudioDownload = () => {
			const audios = editor.view.dom.querySelectorAll("audio");
			for (const audio of audios) {
				const audioElement = audio as HTMLAudioElement;
				if (audioElement.dataset.downloadDisabled) continue;
				audioElement.setAttribute("controlsList", "nodownload");
				audioElement.dataset.downloadDisabled = "true";
			}
		};

		setTimeout(disableAudioDownload, 100);

		const handleUpdate = () => {
			setTimeout(disableAudioDownload, 100);
		};
		editor.on("update", handleUpdate);
		return () => {
			editor.off("update", handleUpdate);
		};
	}, [editor]);

	if (!editor) return null;

	return (
		<div className="p-4 sm:p-6 min-h-[500px] bg-background border rounded-sm">
			<EditorContent
				editor={editor}
				className="prose prose-sm sm:prose lg:prose-lg max-w-none"
			/>

			<ImagePreview
				isOpen={isPreviewOpen}
				imageUrl={previewImageUrl}
				imageAlt={previewImageAlt}
				onClose={() => setIsPreviewOpen(false)}
			/>
		</div>
	);
}
