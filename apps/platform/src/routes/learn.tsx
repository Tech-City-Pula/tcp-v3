import { createFileRoute } from '@tanstack/react-router';
import { resources } from '@/lib/learn';

const ResourceLink = ({ name, href, description }: { name: string; href: string; description?: string }) => (
  <li>
    <a
      href={href}
      rel="noopener"
      target="_blank"
    >
      <div>
        <h3>{name}</h3>
        <span aria-hidden>
          ↗
        </span>
      </div>
      {description ? <p>{description}</p> : null}
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
  <section>
    <h2>
      <span>[</span> {title.toUpperCase()} <span>]</span>
    </h2>
    <ul>
      {items.map((item) => (
        <ResourceLink description={item.description} href={item.href} key={item.href} name={item.name} />
      ))}
    </ul>
  </section>
);

const ResourcesPage = () => (
  <main>
    <div>
      <header>
        <h1>
          <span>[</span> RESOURCES <span>]</span>
        </h1>
        <p>Curated links to documentation and references.</p>
      </header>

      <section>
        <h2>
          <span>[</span> VIDEO <span>]</span>
        </h2>
        <div>
          <div>
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
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
