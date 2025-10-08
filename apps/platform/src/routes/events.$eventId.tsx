import { RichTextOutput } from '@repo/ui/components/rich-text-output';
import { createFileRoute, Link } from '@tanstack/react-router';
import TurndownService from 'turndown';
import { formatDate } from '@/lib/posts';
import { EventAttend } from '../components/attend-event';
import { getEvent } from '../server/events';

export const Route = createFileRoute('/events/$eventId')({
  loader: async ({ params }) => {
    return await getEvent({ data: { eventId: params.eventId } });
  },
  component: RouteComponent,
  pendingComponent: () => (
    <div>
      <span>[ LOADING_EVENT ]</span>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div>
      <div>
        <div>[ ROUTE_ERROR ]</div>
        <pre>{String(error)}</pre>
      </div>
    </div>
  ),
});

function RouteComponent() {
  const event = Route.useLoaderData();
  const td = new TurndownService();

  if (!event) {
    return (
      <div>
        <div>
          <h1>
            <span>[</span>ERROR_404<span>]</span>
          </h1>
          <p>&gt; Event not found in database</p>
          <Link
            to="/events"
          >
            [&larr;] RETURN_TO_EVENTS
          </Link>
        </div>
      </div>
    );
  }

  const maxIdLength = -8;
  return (
    <main>
      {/* background pattern */}
      <div />

      <div>
        {/* Navigation */}
        <div>
          <Link
            to="/events"
          >
            [&larr;] BACK_TO_EVENTS
          </Link>
        </div>

        {/* Hero Image Section */}
        <section>
          {/* No image or category */}
          <div />
          {/* Event ID */}
          <div>
            [{event.eventId.slice(maxIdLength).toUpperCase()}]
          </div>
        </section>

        {/* Title Section */}
        <section>
          <h1>
            <span>[</span>
            {event.title}
            <span>]</span>
          </h1>
        </section>

        {/* Time and Location Section */}
        <section>
          <div>
            <div>DATE_TIME:</div>
            <div>{formatDate(event.eventAt)}</div>
          </div>
          <div>
            <div>LOCATION:</div>
            <div>{event.location}</div>
          </div>
          <div>
            <div>CAPACITY:</div>
            <div>{/* You can add attendance info here if available */}</div>
            <div>ATTENDING</div>
          </div>
        </section>

        {/* Description Section */}
        <section>
          <h2>&gt; EVENT_DESCRIPTION.txt</h2>
          <div>
            <div>
              <RichTextOutput markdown={td.turndown(event.description)} />
            </div>
          </div>
        </section>

        {/* Event Attend Section */}
        <EventAttend eventId={event.eventId} />

        {/* Further Details Section */}
        <section>
          {/* No category */}
          <div>
            <div>EVENT_ID:</div>
            <div>{event.eventId.slice(maxIdLength).toUpperCase()}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
