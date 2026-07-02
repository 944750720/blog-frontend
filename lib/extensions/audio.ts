import { mergeAttributes, Node } from "@tiptap/core";

export const Audio = Node.create({
	name: "audio",

	group: "block",
	atom: true,
	selectable: true,
	draggable: true,
	inline: false,

	addAttributes() {
		return {
			src: { default: null },
			controls: { default: true },
			autoplay: { default: false },
			loop: { default: false },
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
			{ tag: "audio" },
			{
				tag: "figure.audio-figure",
				contentElement: "audio",
				getAttrs: (element) => {
					const el = element as HTMLElement;
					if (!el.querySelector("audio")) return false;
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

		const audioAttrs = mergeAttributes(
			restAttrs,
			{ style: "pointer-events: auto;" },
			autoplay ? { autoplay: true } : {},
			loop ? { loop: true } : {},
		);

		const figureAttrs = {
			style: textAlign ? `text-align: ${textAlign}` : undefined,
			class: "audio-figure",
			"data-audio-wrapper": "true",
		};

		const children = caption
			? [
					["audio", audioAttrs],
					["figcaption", { class: "audio-caption" }, caption],
				]
			: [["audio", audioAttrs]];

		return ["figure", figureAttrs, ...children];
	},
});
