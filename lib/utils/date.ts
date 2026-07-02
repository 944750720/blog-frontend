export function formatDate(dateString: string, locale = "zh"): string {
	const date = new Date(dateString);
	return date.toLocaleDateString(
		locale === "zh" ? "zh-CN" : locale === "ja" ? "ja-JP" : "en-US",
		{
			year: "numeric",
			month: "long",
			day: "numeric",
		},
	);
}
