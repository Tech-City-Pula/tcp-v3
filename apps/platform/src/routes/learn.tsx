import { createFileRoute } from '@tanstack/react-router';
import { resources } from '@/lib/learn';

const ResourceLink = ({ name, href, description }: { name: string; href: string; description?: string }) => (
  <li className="group">
    <a
      className="block rounded border border-emerald-500/40 bg-black/70 p-4 transition-colors hover:border-emerald-500"
      href={href}
      rel="noopener"
      target="_blank"
    >
      <div className="flex items-baseline justify-between">
        <h3 className="font-mono text-base text-emerald-400">{name}</h3>
        <span aria-hidden className="text-emerald-500 transition-transform group-hover:translate-x-0.5">
          ↗
        </span>
      </div>
      {description ? <p className="mt-1 text-emerald-200/80 text-sm">{description}</p> : null}
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
      <span className="text-white">[</span> {title.toUpperCase()} <span className="text-white">]</span>
    </h2>
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <ResourceLink description={item.description} href={item.href} key={item.href} name={item.name} />
      ))}
    </ul>
  </section>
);

const ResourcesPage = () => (
  <main className="min-h-screen bg-black text-emerald-500">
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8">
        <h1 className="font-mono text-2xl text-emerald-500">
          <span className="text-white">[</span> RESOURCES <span className="text-white">]</span>
        </h1>
        <p className="mt-2 text-emerald-200/80">Curated links to documentation and references.</p>
      </header>

      <section className="mb-10">
        <h2 className="mb-3 font-mono text-emerald-500 text-xl">
          <span className="text-white">[</span> VIDEO <span className="text-white">]</span>
        </h2>
        <div className="relative w-full overflow-hidden rounded border border-emerald-500/40 bg-black/70">
          <div className="relative w-full pb-[56.25%]">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 h-full w-full"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              src="https://www.youtube.com/embed/rBJSN2tzyEc?rel=0&modestbranding=1&cc_load_policy=1"
              title="YouTube video: TanStack Router overview"
            />
          </div>
        </div>
      </section>

      {resources.map((cat) => (
        <CategorySection items={cat.items} key={cat.title} title={cat.title} />
      ))}
    </div>
  </main>
);

export const Route = createFileRoute('/learn')({
  component: ResourcesPage,
});
