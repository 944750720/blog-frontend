import { useCallback, useEffect, useState } from "react";

export function useScrollDirection() {
	const [isNotTop, setIsNotTop] = useState(false);

	const handleScroll = useCallback(() => {
		setIsNotTop(window.scrollY > 20);
	}, []);

	useEffect(() => {
		setIsNotTop(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	return { isNotTop };
}
