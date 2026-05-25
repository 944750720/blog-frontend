"use client";

import { Button } from "@/components/ui/button";
import { useThemeCycle } from "@/hooks/useThemeCycle";

export function ThemeSwitcher() {
	const { theme, cycleTheme, ThemeIcon } = useThemeCycle();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={cycleTheme}
			aria-label={`Theme: ${theme}`}
		>
			<ThemeIcon className="size-4" />
		</Button>
	);
}
