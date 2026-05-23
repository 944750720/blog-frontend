import { useEffect, useState } from "react";

export function useScrollProgress(threshold = 200) {
	const [show, setShow] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			setShow(scrollY > threshold);
			setProgress(
				docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0,
			);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [threshold]);

	return { show, progress };
}
