import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NotFoundContent() {
	return (
		<section className="flex flex-col items-center justify-center min-h-[60vh] gap-y-4">
			<h1 className="text-4xl font-bold">404</h1>
			<p className="text-muted-foreground">Page not found</p>
			<Button asChild>
				<Link href="/">Back to Home</Link>
			</Button>
		</section>
	);
}
