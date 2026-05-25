import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useThemeCycle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const cycleTheme = () => {
		if (theme === "system") setTheme("light");
		else if (theme === "light") setTheme("dark");
		else setTheme("system");
	};

	const ThemeIcon = !mounted
		? Monitor
		: theme === "light"
			? Sun
			: theme === "dark"
				? Moon
				: Monitor;

	const resolvedLabel = mounted ? theme : "system";

	return { theme: resolvedLabel, cycleTheme, ThemeIcon };
}
