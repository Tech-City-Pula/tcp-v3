import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { desc, ilike } from 'drizzle-orm';
import { Search } from 'lucide-react';
import { useState } from 'react';
import z from 'zod';
import { EventListItem } from '@/components/event-list-item';
import { Input } from '@/components/ui/input';

// Shared validator for search params + server fn input
const searchSchema = z.object({
  search: z.string().optional().default(''),
  page: z.coerce.number().int().positive().default(1),
});

// Server function (GET) - list events
export const getEvents = createServerFn({ method: 'GET' })
  .validator(searchSchema)
  .handler(async ({ data }) => {
    const pageSize = 10;
    const page = data.page - 1; // zero-index
    const base = db
      .select()
      .from(schema.events)
      .where(ilike(schema.events.title, `%${data.search}%`))
      // Always show most recent first
      .orderBy(desc(schema.events.eventAt));
    // Optional: filter out past events when 'upcoming' is selected
    // For now, just sort by ascending for 'upcoming'.
    const rows = await base.limit(pageSize).offset(page * pageSize);
    return rows;
  });

export const Route = createFileRoute('/events/')({
  validateSearch: searchSchema,
  async beforeLoad(ctx) {
    const events = await getEvents({
      data: {
        search: ctx.search.search,
        page: ctx.search.page,
      },
    });
    return { events };
  },
  loader: (ctx) => ctx.context.events,
  component: RouteComponent,
});

function RouteComponent() {
  const events = Route.useLoaderData();
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();

  const [search, setSearch] = useState(searchParams.search ?? '');
  // No order control; always most recent first

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate({
      search: (prev) => ({
        ...prev,
        search,
        page: 1,
      }),
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-bold text-4xl">Events</h1>
          <p className="text-lg text-muted-foreground">Find and join our upcoming meetups and community events.</p>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mb-6 max-w-3xl">
          <div className="flex flex-col items-stretch gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
              <Input
                aria-label="Search events"
                name="search"
                className="rounded-xl pl-10"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* Order removed; always most recent first */}
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:opacity-90"
            >
              Apply
            </button>
          </div>
        </form>
        {searchParams.search ? (
          <div className="mb-4 text-center text-muted-foreground text-sm">
            Found {events.length} event{events.length === 1 ? '' : 's'} for "{searchParams.search}"
          </div>
        ) : null}
        <div className="mx-auto max-w-3xl space-y-6">
          {events.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))}
          {events.length === 0 ? (
            <div className="rounded-xl border py-12 text-center text-muted-foreground">
              No events found. Try a different search.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
