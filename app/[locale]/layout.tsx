import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import MswProvider from "../components/MswProvider";
import SWRProvider from "../components/SWRProvider";

export default async function LocaleLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
	);
}
