import { useCallback, useEffect, useRef, useState } from "react";

export function useScrollDirection() {
	const [isNotTop, setIsNotTop] = useState(false);
	const [show, setShow] = useState(true);
	const preScrollY = useRef(0);

	const handleScroll = useCallback(() => {
		const scrollY = window.scrollY;
		setIsNotTop(scrollY > 20);
		setShow(scrollY < 350 || scrollY < preScrollY.current);
		preScrollY.current = scrollY;
	}, []);

	useEffect(() => {
		preScrollY.current = window.scrollY;
		setIsNotTop(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	return { isNotTop, show };
}
