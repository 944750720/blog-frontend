import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const SUPPORTED_LOCALES = ["zh", "en", "ja"];
const DEFAULT_LOCALE = "en";

export default getRequestConfig(async () => {
	const cookieStore = await cookies();
	const rawLocale = cookieStore.get("NEXT_LOCALE")?.value ?? "";

	const locale = SUPPORTED_LOCALES.includes(rawLocale)
		? rawLocale
		: DEFAULT_LOCALE;
	const messages = (await import(`./messages/${locale}.json`)).default;

	return { locale, messages };
});
