import {
	Crimson_Pro,
	JetBrains_Mono,
	Noto_Sans_SC,
	Noto_Serif_SC,
} from "next/font/google";

export const crimsonPro = Crimson_Pro({
	variable: "--font-crimson-pro",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
});

export const jetBrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
	display: "swap",
});

export const notoSansSC = Noto_Sans_SC({
	variable: "--font-noto-sans-sc",
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	display: "swap",
});

export const notoSerifSC = Noto_Serif_SC({
	variable: "--font-noto-serif-sc",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
});

export const fontVariables = [
	crimsonPro.variable,
	jetBrainsMono.variable,
	notoSansSC.variable,
	notoSerifSC.variable,
].join(" ");
