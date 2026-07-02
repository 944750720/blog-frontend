import { BlogDetails } from "@/components/blog/BlogDetails";

export default async function BlogDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	return <BlogDetails blogSlug={slug} />;
}
