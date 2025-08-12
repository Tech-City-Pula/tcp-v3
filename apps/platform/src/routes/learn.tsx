import { createFileRoute } from "@tanstack/react-router";

const resources = [
	{
		title: "React & Routing",
		items: [
			{
				name: "React Docs",
				href: "https://react.dev/",
				description: "Official React documentation.",
			},
			{
				name: "TanStack Router",
				href: "https://tanstack.com/router/latest",
				description: "File-based routing, loaders, actions, and more.",
			},
			{
				name: "TanStack Start",
				href: "https://tanstack.com/router/latest/docs/framework/react-start",
				description: "Full-stack React framework built on TanStack Router.",
			},
		],
	},
	{
		title: "Tooling",
		items: [
			{
				name: "Vite",
				href: "https://vitejs.dev/",
				description: "Fast frontend tooling & dev server.",
			},
			{
				name: "TypeScript",
				href: "https://www.typescriptlang.org/docs/",
				description: "TypeScript handbook and docs.",
			},
			{
				name: "Zod",
				href: "https://zod.dev/",
				description: "Type-safe schema validation.",
			},
			{
				name: "Tailwind CSS",
				href: "https://tailwindcss.com/docs",
				description: "Utility-first CSS framework.",
			},
			{
				name: "Biome",
				href: "https://biomejs.dev/",
				description: "Formatter and linter used in this repo.",
			},
			{
				name: "pnpm Workspaces",
				href: "https://pnpm.io/workspaces",
				description: "Monorepo management with pnpm.",
			},
			{
				name: "Next.js",
				href: "https://nextjs.org/docs",
				description: "React framework for production.",
			},
		],
	},
	{
		title: "Database & Backend",
		items: [
			{
				name: "Drizzle ORM",
				href: "https://orm.drizzle.team/",
				description: "Type-safe ORM for SQL.",
			},
			{
				name: "Supabase",
				href: "https://supabase.com/docs",
				description: "Open-source Firebase alternative.",
			},
		],
	},
	{
		title: "Email",
		items: [
			{
				name: "React Email",
				href: "https://react.email/",
				description: "Build and preview emails with React.",
			},
		],
	},
] as const;

const ResourceLink = ({
	name,
	href,
	description,
}: {
	name: string;
	href: string;
	description?: string;
}) => (
	<li className="group">
		<a
			className="block rounded border border-emerald-500/40 bg-black/70 p-4 transition-colors hover:border-emerald-500"
			href={href}
			rel="noopener"
			target="_blank"
		>
			<div className="flex items-baseline justify-between">
				<h3 className="font-mono text-emerald-400 text-base">{name}</h3>
				<span
					aria-hidden
					className="text-emerald-500 transition-transform group-hover:translate-x-0.5"
				>
					↗
				</span>
			</div>
			{description ? (
				<p className="mt-1 text-emerald-200/80 text-sm">{description}</p>
			) : null}
		</a>
	</li>
);

const CategorySection = ({
	title,
	items,
}: {
	title: string;
	items: ReadonlyArray<{ name: string; href: string; description?: string }>;
}) => (
	<section className="mb-10">
		<h2 className="mb-3 font-mono text-emerald-500 text-xl">
			<span className="text-white">[</span> {title.toUpperCase()}{" "}
			<span className="text-white">]</span>
		</h2>
		<ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{items.map((item) => (
				<ResourceLink
					key={item.href}
					name={item.name}
					href={item.href}
					description={item.description}
				/>
			))}
		</ul>
	</section>
);

const ResourcesPage = () => (
	<main className="min-h-screen bg-black text-emerald-500">
		<div className="mx-auto max-w-5xl px-4 py-12">
			<header className="mb-8">
				<h1 className="font-mono text-emerald-500 text-2xl">
					<span className="text-white">[</span> RESOURCES{" "}
					<span className="text-white">]</span>
				</h1>
				<p className="mt-2 text-emerald-200/80">
					Curated links to documentation and references.
				</p>
			</header>

			<section className="mb-10">
				<h2 className="mb-3 font-mono text-emerald-500 text-xl">
					<span className="text-white">[</span> VIDEO{" "}
					<span className="text-white">]</span>
				</h2>
				<div className="relative w-full overflow-hidden rounded border border-emerald-500/40 bg-black/70">
					<div className="relative w-full pb-[56.25%]">
						<iframe
							className="absolute left-0 top-0 h-full w-full"
							src="https://www.youtube.com/embed/rBJSN2tzyEc?rel=0&modestbranding=1&cc_load_policy=1"
							title="YouTube video: TanStack Router overview"
							loading="lazy"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						/>
					</div>
				</div>
			</section>

			{resources.map((cat) => (
				<CategorySection key={cat.title} title={cat.title} items={cat.items} />
			))}
		</div>
	</main>
);

export const Route = createFileRoute("/learn")({
	component: ResourcesPage,
});
