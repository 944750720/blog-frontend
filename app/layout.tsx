import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import "./globals.css";
import { BfcacheHandler } from "@/components/layout/BfcacheHandler";
import { NoiseTexture } from "@/components/ui/noise-texture";
import { siteConfig } from "@/lib/config";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh" suppressHydrationWarning>
			<body
				className={cn(
					"flex justify-center bg-cream text-foreground antialiased dark:bg-background",
					fontVariables,
				)}
			>
				<BfcacheHandler />
				<NoiseTexture className="fixed inset-0 z-[60] opacity-[0.07] dark:opacity-[0.12]" />
				{children}
				{process.env.NEXT_PUBLIC_GA_ID && (
					<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
				)}
			</body>
		</html>
	);
}
