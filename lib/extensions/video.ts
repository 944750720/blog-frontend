import { mergeAttributes, Node } from "@tiptap/core";

export const Video = Node.create({
	name: "video",

	group: "block",
	selectable: true,
	draggable: true,
	atom: true,

	addAttributes() {
		return {
			src: { default: null },
			controls: { default: true },
			autoplay: { default: false },
			loop: { default: false },
			width: { default: "100%" },
			height: { default: "auto" },
			poster: { default: null },
			preload: { default: "metadata" },
			textAlign: {
				default: "left",
				parseHTML: (element) => {
					const figure = element.closest("figure");
					return figure?.style.textAlign || element.style.textAlign || "left";
				},
				renderHTML: () => ({}),
			},
			caption: {
				default: null,
				parseHTML: (element) => {
					const figure = element.closest("figure");
					return figure?.querySelector("figcaption")?.textContent || null;
				},
				renderHTML: () => ({}),
			},
		};
	},

	parseHTML() {
		return [
			{ tag: "video" },
			{
				tag: "figure.video-figure",
				contentElement: "video",
				getAttrs: (element) => {
					const el = element as HTMLElement;
					if (!el.querySelector("video")) return false;
					return {
						textAlign: el.style.textAlign || "left",
						caption: el.querySelector("figcaption")?.textContent || null,
					};
				},
			},
		];
	},

	renderHTML({ node }) {
		const { caption, textAlign, autoplay, loop, ...restAttrs } = node.attrs;

		const videoAttrs = mergeAttributes(
			{
				class:
					"max-w-full h-auto shadow-lg border border-border transition-[opacity,transform] duration-300 ease-in-out focus:outline-none cursor-pointer",
				style: "max-width: 100%; height: auto;",
				controlsList: "nodownload noremoteplayback",
			},
			restAttrs,
			autoplay ? { autoplay: true } : {},
			loop ? { loop: true } : {},
		);

		const figureAttrs = {
			style: textAlign ? `text-align: ${textAlign}` : undefined,
			class: "video-figure",
		};

		const children = caption
			? [
					["video", videoAttrs],
					["figcaption", { class: "video-caption" }, caption],
				]
			: [["video", videoAttrs]];

		return ["figure", figureAttrs, ...children];
	},
});
