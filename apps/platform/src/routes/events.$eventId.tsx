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
    <div className="flex min-h-screen items-center justify-center bg-black font-mono text-emerald-500">
      <span className="border-2 border-emerald-500 px-4 py-2">[ LOADING_EVENT ]</span>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center bg-black font-mono text-emerald-500">
      <div className="border-2 border-emerald-500 p-6">
        <div className="mb-2 text-white">[ ROUTE_ERROR ]</div>
        <pre className="text-emerald-300 text-sm">{String(error)}</pre>
      </div>
    </div>
  ),
});

function RouteComponent() {
  const event = Route.useLoaderData();
  const td = new TurndownService();

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-emerald-500">
        <div className="text-center">
          <h1 className="mb-4 font-bold font-mono text-4xl text-emerald-500">
            <span className="text-white">[</span>ERROR_404<span className="text-white">]</span>
          </h1>
          <p className="mb-8 font-mono text-emerald-300">&gt; Event not found in database</p>
          <Link
            className="border-2 border-emerald-500 bg-black px-6 py-3 font-bold font-mono text-emerald-500 transition-all duration-300 hover:bg-emerald-500 hover:text-black"
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
    <main className="relative min-h-screen overflow-x-hidden bg-black text-emerald-500">
      {/* background pattern */}
      <div className="absolute inset-0 z-0 animate-[matrix_20s_linear_infinite] bg-[length:20px_20px] bg-[linear-gradient(90deg,rgba(16,185,129,0.3)_1px,transparent_1px),linear-gradient(rgba(16,185,129,0.3)_1px,transparent_1px)] opacity-10" />

      <div className="relative z-10">
        {/* Navigation */}
        <div className="p-8">
          <Link
            className="font-mono text-emerald-500 underline transition-colors duration-300 hover:text-white"
            to="/events"
          >
            [&larr;] BACK_TO_EVENTS
          </Link>
        </div>

        {/* Hero Image Section */}
        <section className="relative h-[420px] overflow-hidden md:h-[560px]">
          {/* No image or category */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          {/* Event ID */}
          <div className="absolute top-6 left-6 font-bold font-mono text-emerald-500 text-sm">
            [{event.eventId.slice(maxIdLength).toUpperCase()}]
          </div>
        </section>

        {/* Title Section */}
        <section className="mx-auto max-w-4xl px-8 pt-8">
          <h1 className="mb-2 font-bold font-mono text-3xl text-emerald-500 leading-tight tracking-wide md:text-4xl">
            <span className="text-white">[</span>
            {event.title}
            <span className="text-white">]</span>
          </h1>
        </section>

        {/* Time and Location Section */}
        <section className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-8 py-6 md:grid-cols-3">
          <div className="border border-emerald-500/30 bg-black/50 p-6">
            <div className="mb-3 font-bold font-mono text-emerald-500 text-sm">DATE_TIME:</div>
            <div className="font-mono text-lg text-white">{formatDate(event.eventAt)}</div>
          </div>
          <div className="border border-emerald-500/30 bg-black/50 p-6">
            <div className="mb-3 font-bold font-mono text-emerald-500 text-sm">LOCATION:</div>
            <div className="font-mono text-lg text-white">{event.location}</div>
          </div>
          <div className="border border-emerald-500/30 bg-black/50 p-6">
            <div className="mb-3 font-bold font-mono text-emerald-500 text-sm">CAPACITY:</div>
            <div className="font-mono text-lg text-white">{/* You can add attendance info here if available */}</div>
            <div className="mt-2 font-mono text-emerald-300 text-sm">ATTENDING</div>
          </div>
        </section>

        {/* Description Section */}
        <section className="mx-auto max-w-4xl px-8 py-6">
          <h2 className="mb-4 font-bold font-mono text-2xl text-emerald-500">&gt; EVENT_DESCRIPTION.txt</h2>
          <div className="border border-emerald-500/30 bg-black/50 p-8">
            <div className="prose prose-invert">
              <RichTextOutput markdown={td.turndown(event.description)} />
            </div>
          </div>
        </section>

        {/* Event Attend Section */}
        <EventAttend eventId={event.eventId} />

        {/* Further Details Section */}
        <section className="mx-auto max-w-4xl grid-cols-1 gap-6 px-8 pb-10 md:grid-cols-2">
          {/* No category */}
          <div className="border border-emerald-500/30 bg-black/50 p-6">
            <div className="mb-2 font-bold font-mono text-emerald-500 text-sm">EVENT_ID:</div>
            <div className="font-mono text-lg text-white">{event.eventId.slice(maxIdLength).toUpperCase()}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
