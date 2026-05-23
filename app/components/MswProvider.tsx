"use client";

import { useEffect, useState } from "react";

export default function MswProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		async function enableMocking() {
			if (process.env.NODE_ENV !== "development") {
				setReady(true);
				return;
			}

			const { worker } = await import("@/app/lib/services/mock/browser");

			await worker.start({
				onUnhandledRequest: "bypass",
			});

			setReady(true);
		}

		enableMocking();
	}, []);

	if (!ready) {
		return null;
	}

	return children;
}
