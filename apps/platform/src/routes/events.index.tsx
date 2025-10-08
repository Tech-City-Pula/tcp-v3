import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { Input } from '@repo/ui/components/shadcn/input';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { desc, ilike } from 'drizzle-orm';
import { Search } from 'lucide-react';
import { useState } from 'react';
import z from 'zod';
import { EventListItem } from '@/components/event-list-item';

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
    <div>
      <div>
        <div>
          <h1>Events</h1>
          <p>Find and join our upcoming meetups and community events.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <Search />
              <Input
                aria-label="Search events"
                name="search"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* Order removed; always most recent first */}
            <button
              type="submit"
            >
              Apply
            </button>
          </div>
        </form>
        {searchParams.search ? (
          <div>
            Found {events.length} event{events.length === 1 ? '' : 's'} for "{searchParams.search}"
          </div>
        ) : null}
        <div>
          {events.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))}
          {events.length === 0 ? (
            <div>
              No events found. Try a different search.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
