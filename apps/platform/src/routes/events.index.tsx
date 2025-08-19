import { createFileRoute, Link } from '@tanstack/react-router';
import type { EventRow } from '../server/events';
import { listEvents } from '../server/events';

export const Route = createFileRoute('/events/')({
  loader: async () => {
    return await listEvents();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const events = Route.useLoaderData() as EventRow[];
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-emerald-500">
      {/* background pattern */}
      <div className="absolute inset-0 z-0 animate-[matrix_20s_linear_infinite] bg-[length:20px_20px] bg-[linear-gradient(90deg,rgba(16,185,129,0.3)_1px,transparent_1px),linear-gradient(rgba(16,185,129,0.3)_1px,transparent_1px)] opacity-10" />

      <div className="relative z-10 mx-auto max-w-[1200px] p-8">
        <Link className="text-white underline" to="/">
          Home
        </Link>
        <header className="mb-12 text-center">
          <h1 className="mb-4 font-bold font-mono text-4xl text-emerald-500 tracking-wide md:text-5xl">
            <span className="text-white">[</span>EVENTS<span className="text-white">]</span>
          </h1>
          <p className="mb-4 font-mono text-emerald-300 text-lg">&gt; Connecting_minds.exe --location=pula</p>
          <div className="mt-4 flex justify-center">
            <span className="border-2 border-emerald-500 bg-black/80 px-4 py-2 font-bold font-mono text-emerald-500 text-sm">
              STATUS: {events.length} EVENTS_LOADED
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Link
              className="cursor-pointer overflow-hidden border-2 border-emerald-500/30 bg-black transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              key={event.eventId}
              params={{
                eventId: event.eventId,
              }}
              to="/events/$eventId"
            >
              <div className="relative h-[200px] overflow-hidden">
                {/* No image or category */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 font-bold font-mono text-emerald-500 text-xs">
                  [{event.eventId.slice(-8).toUpperCase()}]
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-4 font-bold font-mono text-emerald-500 text-lg transition-colors duration-300 group-hover:text-white">
                  {event.title}
                </h3>

                <div className="mb-4">
                  <div className="mb-2 font-mono text-emerald-300 text-sm">
                    <span className="font-bold text-white">&gt;</span> {formatDate(event.eventAt)}
                  </div>
                  <div className="mb-2 font-mono text-emerald-300 text-sm">
                    <span className="font-bold text-white">&gt;</span> {event.location}
                  </div>
                </div>

                <p className="mb-4 text-gray-400 text-sm leading-relaxed">{event.description}</p>

                <div className="flex items-center justify-between">
                  <span className="font-bold font-mono text-emerald-300 text-xs">
                    {/* You can add attendance info here if available */}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
