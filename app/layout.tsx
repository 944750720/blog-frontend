import type { Metadata } from "next";
import {
	Crimson_Pro,
	JetBrains_Mono,
	Noto_Sans_SC,
	Noto_Serif_SC,
} from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import MswProvider from "./components/MswProvider";
import SWRProvider from "./components/SWRProvider";

const crimsonPro = Crimson_Pro({
	variable: "--font-crimson-pro",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
	display: "swap",
});

const notoSansSC = Noto_Sans_SC({
	variable: "--font-noto-sans-sc",
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
	variable: "--font-noto-serif-sc",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();
	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				{/* Google Analytics */}
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
				</Script>
			</head>
			<body
				data-local={locale}
				className={cn(
					"flex justify-center bg-background text-foreground antialiased",
					crimsonPro.variable,
					jetBrainsMono.variable,
					notoSansSC.variable,
					notoSerifSC.variable,
				)}
			>
				<ThemeProvider>
					<NextIntlClientProvider locale={locale} messages={messages}>
						<MswProvider>
							<SWRProvider>
								<div className="w-full max-w-[70rem] min-h-dvh flex flex-col justify-between px-4 sm:px-7 lg:px-10">
									<Header />
									<main className="flex-1 w-full">{children}</main>
									<Footer />
								</div>
								<Toaster position="top-center" reverseOrder={false} />
								<SpeedInsights />
							</SWRProvider>
						</MswProvider>
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
