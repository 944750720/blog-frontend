export default function Home() {
	return (
		<div className="flex flex-col items-center py-16">
			{/* Hero */}
			<section className="flex flex-col items-center gap-y-4">
				<h1 className="text-4xl font-bold">CHJ Blog</h1>
				<p className="text-muted-foreground">Welcome to my blog</p>
			</section>

			{/* Placeholder content for scroll testing */}
			<section className="w-full md:w-4/5 lg:w-5/6 mt-16 space-y-8">
				{[
					{ id: "post-1", title: "Post Title 1" },
					{ id: "post-2", title: "Post Title 2" },
					{ id: "post-3", title: "Post Title 3" },
					{ id: "post-4", title: "Post Title 4" },
					{ id: "post-5", title: "Post Title 5" },
					{ id: "post-6", title: "Post Title 6" },
					{ id: "post-7", title: "Post Title 7" },
					{ id: "post-8", title: "Post Title 8" },
					{ id: "post-9", title: "Post Title 9" },
					{ id: "post-10", title: "Post Title 10" },
				].map((post) => (
					<article key={post.id} className="rounded-lg border p-6 space-y-2">
						<h2 className="text-xl font-semibold">{post.title}</h2>
						<p className="text-muted-foreground">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
					</article>
				))}
			</section>
		</div>
	);
}
