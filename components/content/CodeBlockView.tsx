"use client";

import {
	NodeViewContent,
	type NodeViewProps,
	NodeViewWrapper,
} from "@tiptap/react";
import { Check, ChevronDown, ChevronUp, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const LANGUAGE_MAP: Record<string, string> = {
	javascript: "JavaScript",
	typescript: "TypeScript",
	python: "Python",
	java: "Java",
	css: "CSS",
	html: "HTML",
	xml: "XML",
	json: "JSON",
	sql: "SQL",
	bash: "Bash",
	shell: "Shell",
	markdown: "Markdown",
	yaml: "YAML",
	dockerfile: "Dockerfile",
	go: "Go",
	rust: "Rust",
	php: "PHP",
	ruby: "Ruby",
	swift: "Swift",
	kotlin: "Kotlin",
	csharp: "C#",
	plaintext: "Text",
};

const COLLAPSE_THRESHOLD = 300;

export function CodeBlockView({ node }: NodeViewProps) {
	const t = useTranslations("content");
	const language = (node.attrs.language as string) || "plaintext";
	const displayLanguage = LANGUAGE_MAP[language] || language;

	const [copied, setCopied] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [collapsible, setCollapsible] = useState(false);
	const codeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!codeRef.current) return;
		const check = () => {
			const height = codeRef.current?.scrollHeight ?? 0;
			if (height > COLLAPSE_THRESHOLD) {
				setCollapsible(true);
				setCollapsed(true);
			}
		};
		const timer = setTimeout(check, 50);
		return () => clearTimeout(timer);
	}, []);

	const handleCopy = async () => {
		const code = codeRef.current?.textContent || "";
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<NodeViewWrapper as="pre" className="code-block-wrapper">
			<div className="code-toolbar">
				<span className="language-label">{displayLanguage}</span>

				{collapsible && (
					<button
						type="button"
						className={cn("code-btn", {
							"code-btn-active": collapsed,
						})}
						onClick={() => setCollapsed((c) => !c)}
					>
						{collapsed ? (
							<ChevronDown className="size-3.5" aria-hidden="true" />
						) : (
							<ChevronUp className="size-3.5" aria-hidden="true" />
						)}
						{collapsed ? t("codeExpand") : t("codeCollapse")}
					</button>
				)}

				<button
					type="button"
					className={cn("code-btn", { "code-btn-copied": copied })}
					onClick={handleCopy}
				>
					{copied ? (
						<Check className="size-3.5" aria-hidden="true" />
					) : (
						<Copy className="size-3.5" aria-hidden="true" />
					)}
					{copied ? t("codeCopied") : t("copyCode")}
				</button>
			</div>

			<div
				ref={codeRef}
				className={cn("code-body", { "code-body-collapsed": collapsed })}
			>
				<NodeViewContent as="code" className={`language-${language}`} />
			</div>
		</NodeViewWrapper>
	);
}
