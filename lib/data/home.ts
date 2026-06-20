export const skills = [
	{
		category: "AI & Large Language Models",
		tags: [
			"LLMOps",
			"LangChain",
			"RAG",
			"Structured Output",
			"Cursor",
			"Claude Code",
		],
	},
	{
		category: "Frontend Development",
		tags: [
			"React.js",
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"Framer Motion",
			"Linaria",
			"jotai",
		],
	},
	{
		category: "Backend Development",
		tags: [
			"Python",
			"FastAPI",
			"GraphQL",
			"PostgreSQL",
			"Drizzle ORM",
			"SQLAlchemy",
		],
	},
	{
		category: "Cloud & DevOps & Data",
		tags: [
			"AWS",
			"GCP",
			"Azure",
			"Docker",
			"Terraform",
			"GitHub Actions",
			"Nginx",
			"dbt",
			"dagster",
		],
	},
];

export const projects = [
	{
		title: "Blog Platform",
		subtitle: "Full-Stack Blog System",
		href: "/projects",
		color: "bg-project-blog",
	},
	{
		title: "Open Source",
		subtitle: "Community Contributions",
		href: "/projects",
		color: "bg-project-oss",
	},
];

export const statementText =
	"From idea to launch. Clean, scalable digital products built to move fast, stay simple, and perform in real-world use, driven by clarity, structured systems, and intentional design.";

export const statementChars = statementText
	.split("")
	.map((char, i) => ({ id: `c${i}`, char }));
