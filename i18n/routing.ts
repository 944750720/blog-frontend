import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["zh", "en", "ja"],
	defaultLocale: "zh",
	localePrefix: "always",
});

export const { locales, defaultLocale } = routing;

export const localeNames: Record<string, string> = {
	zh: "中文",
	en: "English",
	ja: "日本語",
};
