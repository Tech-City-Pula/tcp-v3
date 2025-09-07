import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { Button } from '@repo/ui/components/shadcn/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
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
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>Find and join our upcoming meetups and community events.</CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  name="search"
                  placeholder="Search events..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Apply</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {searchParams.search && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              Found {events.length} event{events.length === 1 ? '' : 's'} for "{searchParams.search}"
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {events.map((event) => (
          <EventListItem key={event.id} event={event} />
        ))}
        {events.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No events found. Try a different search.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
