import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import bash from "highlight.js/lib/languages/bash";
import csharp from "highlight.js/lib/languages/csharp";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import sql from "highlight.js/lib/languages/sql";
import html from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import { common, createLowlight } from "lowlight";
import { CodeBlockView } from "@/components/content/CodeBlockView";

const lowlight = createLowlight(common);
lowlight.register("html", html);
lowlight.register("xml", html);
lowlight.register("dockerfile", dockerfile);
lowlight.register("bash", bash);
lowlight.register("shell", bash);
lowlight.register("sql", sql);
lowlight.register("yaml", yaml);
lowlight.register("csharp", csharp);

export const CodeBlock = CodeBlockLowlight.extend({
	addNodeView() {
		return ReactNodeViewRenderer(CodeBlockView);
	},
}).configure({
	lowlight,
	languageClassPrefix: "language-",
});
