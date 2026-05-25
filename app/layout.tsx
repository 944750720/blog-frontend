import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import "./globals.css";
import { BfcacheHandler } from "@/components/layout/BfcacheHandler";
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
					"flex justify-center bg-background text-foreground antialiased",
					fontVariables,
				)}
			>
				<BfcacheHandler />
				{children}
				{process.env.NEXT_PUBLIC_GA_ID && (
					<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
				)}
			</body>
		</html>
	);
}
