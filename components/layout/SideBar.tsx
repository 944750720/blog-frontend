"use client";

import { PanelRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

interface SideBarProps {
	children: React.ReactNode;
	title?: string;
}

export function SideBar({
	children,
	title = "Table of Contents",
}: SideBarProps) {
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* Desktop sidebar */}
			<aside
				className="sticky top-20 min-w-48 basis-60 overflow-y-auto hidden md:block md:order-2 lg:shrink-0"
				style={{ height: "calc(100vh - var(--header-offset))" }}
			>
				{children}
			</aside>

			{/* Mobile sidebar trigger - used by BackToTop */}
			<div className="md:hidden fixed bottom-6 right-6 z-40">
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger asChild>
						<Button
							size="icon"
							variant="outline"
							className="rounded-full shadow-lg"
							aria-label={title}
						>
							<PanelRight className="size-4" />
						</Button>
					</SheetTrigger>
					<SheetContent
						side="right"
						className="min-w-[55vw] sm:min-w-[40vw] max-w-[75vw]"
					>
						<SheetHeader>
							<SheetTitle>{title}</SheetTitle>
						</SheetHeader>
						<div className="mt-4">{children}</div>
					</SheetContent>
				</Sheet>
			</div>
		</>
	);
}
