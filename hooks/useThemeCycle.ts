import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function useThemeCycle() {
	const { theme, setTheme } = useTheme();

	const cycleTheme = () => {
		if (theme === "system") setTheme("light");
		else if (theme === "light") setTheme("dark");
		else setTheme("system");
	};

	const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

	return { theme, cycleTheme, ThemeIcon };
}
