"use client";

import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const switchLocale = () => {
		const next = locale === "zh" ? "en" : "zh";
		router.replace(pathname, { locale: next });
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={switchLocale}
			aria-label="Switch language"
		>
			<Languages className="size-4" />
		</Button>
	);
}
