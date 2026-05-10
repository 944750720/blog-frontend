import type { Middleware } from "swr";
import httpClient from "./client";

export function createLocaleMiddleware(locale: string): Middleware {
	return (useSWRNext) => (key, fetcher, config) => {
		httpClient.defaults.headers.common["Accept-Language"] = locale;

		return useSWRNext(
			Array.isArray(key) ? [...key, locale] : [key, locale],
			fetcher,
			config,
		);
	};
}
