"use client";

import { useLocale } from "next-intl";
import { useMemo } from "react";
import type { SWRConfiguration } from "swr";
import { SWRConfig } from "swr";
import fetcher from "@/app/lib/http/fetcher";
import { createLocaleMiddleware } from "@/app/lib/http/swrMiddleware";

// Error codes that should not trigger retry (deterministic failures)
const NO_RETRY_STATUS = [401, 403, 404];

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();

  const swrConfig: SWRConfiguration = useMemo(
    () => ({
      fetcher,
      use: [createLocaleMiddleware(locale)],
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 3,
      errorRetryInterval: 1000,
      shouldRetryOnError: (error: { status?: number }) =>
        !NO_RETRY_STATUS.includes(error?.status ?? 0),
      dedupingInterval: 2000,
      focusThrottleInterval: 5000,
    }),
    [locale],
  );

  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}
