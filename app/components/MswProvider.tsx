"use client";

import { useEffect } from "react";

export default function MswProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		if (process.env.NODE_ENV !== "development") return;

		import("@/app/lib/services/mock/browser").then(({ worker }) => {
			worker.start({ onUnhandledRequest: "bypass" });
		});
	}, []);

	return children;
}
