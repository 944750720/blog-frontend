import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/config";

function ContentCard({ title, description }: { title: string; description: string }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground text-sm">{description}</p>
			</CardContent>
		</Card>
	);
}

const latestPosts = [
	"Getting Started with Next.js",
	"Understanding Tailwind CSS",
	"React Server Components",
	"Building a Blog",
];

const projects = ["Blog Frontend", "Blog Backend"];

export default function Home() {
	return (
		<section className="flex flex-col items-center">
			{/* Hero */}
			<section className="flex flex-col items-center gap-y-4 pt-12 md:pt-20">
				<Avatar className="size-24">
					<AvatarImage src="/avatar.png" alt={siteConfig.title} />
					<AvatarFallback>CHJ</AvatarFallback>
				</Avatar>
				<h1 className="text-4xl font-bold">{siteConfig.title}</h1>
				<p className="text-muted-foreground text-center max-w-md">
					{siteConfig.description}
				</p>
				<div className="flex gap-x-2">
					<Button asChild>
						<Link href="/blog">Read Blog</Link>
					</Button>
					<Button variant="outline" asChild>
						<Link href="/about">About Me</Link>
					</Button>
				</div>
			</section>

			{/* Latest Posts */}
			<section className="w-full md:w-4/5 lg:w-5/6 mt-16">
				<h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{latestPosts.map((title) => (
						<ContentCard
							key={title}
							title={title}
							description="A brief description of this blog post goes here."
						/>
					))}
				</div>
			</section>

			{/* Projects */}
			<section className="w-full md:w-4/5 lg:w-5/6 mt-16 mb-16">
				<h2 className="text-2xl font-semibold mb-6">Projects</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{projects.map((title) => (
						<ContentCard
							key={title}
							title={title}
							description="A short description of this project."
						/>
					))}
				</div>
			</section>
		</section>
	);
}
