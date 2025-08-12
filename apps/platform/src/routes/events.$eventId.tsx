import { createFileRoute, Link } from "@tanstack/react-router";
import type { Event } from "@/lib/events";
import { mockEvents } from "@/lib/events";

export const Route = createFileRoute("/events/$eventId")({
  component: RouteComponent,
  pendingComponent: () => (
    <div className="min-h-screen bg-black text-emerald-500 flex items-center justify-center font-mono">
      <span className="border-2 border-emerald-500 px-4 py-2">[ LOADING_EVENT ]</span>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-black text-emerald-500 flex items-center justify-center font-mono">
      <div className="p-6 border-2 border-emerald-500">
        <div className="text-white mb-2">[ ROUTE_ERROR ]</div>
        <pre className="text-emerald-300 text-sm">{String(error)}</pre>
      </div>
    </div>
  ),
});

function RouteComponent() {
  const { eventId } = Route.useParams();
  const event = mockEvents.find((e: Event) => e.id === Number(eventId));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-emerald-500 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-mono font-bold text-emerald-500 mb-4">
            <span className="text-white">[</span>ERROR_404<span className="text-white">]</span>
          </h1>
          <p className="text-emerald-300 font-mono mb-8">&gt; Event not found in database</p>
          <Link
            to="/events"
            className="border-2 border-emerald-500 bg-black text-emerald-500 px-6 py-3 font-mono font-bold hover:bg-emerald-500 hover:text-black transition-all duration-300"
          >
            [&larr;] RETURN_TO_EVENTS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-emerald-500 relative overflow-x-hidden">
      {/* background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,rgba(16,185,129,0.3)_1px,transparent_1px),linear-gradient(rgba(16,185,129,0.3)_1px,transparent_1px)] bg-[length:20px_20px] animate-[matrix_20s_linear_infinite] z-0"></div>

      <div className="relative z-10">
        {/* Navigation */}
        <div className="p-8">
          <Link
            to="/events"
            className="text-emerald-500 underline font-mono hover:text-white transition-colors duration-300"
          >
            [&larr;] BACK_TO_EVENTS
          </Link>
        </div>

        {/* Hero Image Section */}
        <section className="relative h-[420px] md:h-[560px] overflow-hidden">
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

          {/* Category Badge */}
          <div className="absolute top-6 right-6 bg-emerald-500 text-black px-4 py-2 font-mono text-sm font-bold">
            {event.category.toUpperCase()}
          </div>

          {/* Event ID */}
          <div className="absolute top-6 left-6 text-emerald-500 font-mono text-sm font-bold">
            [{String(event.id).padStart(3, "0")}]
          </div>
        </section>

        {/* Title Section */}
        <section className="max-w-4xl mx-auto px-8 pt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-500 mb-2 font-mono tracking-wide leading-tight">
            <span className="text-white">[</span>
            {event.title}
            <span className="text-white">]</span>
          </h1>
        </section>

        {/* Time and Location Section */}
        <section className="max-w-4xl mx-auto px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-emerald-500/30 p-6 bg-black/50">
            <div className="text-emerald-500 font-mono text-sm font-bold mb-3">DATE_TIME:</div>
            <div className="text-white font-mono text-lg">{formatDate(event.date)}</div>
            <div className="text-emerald-300 font-mono text-base mt-1">@ {event.time}</div>
          </div>
          <div className="border border-emerald-500/30 p-6 bg-black/50">
            <div className="text-emerald-500 font-mono text-sm font-bold mb-3">LOCATION:</div>
            <div className="text-white font-mono text-lg">{event.location}</div>
          </div>
          <div className="border border-emerald-500/30 p-6 bg-black/50">
            <div className="text-emerald-500 font-mono text-sm font-bold mb-3">CAPACITY:</div>
            <div className="text-white font-mono text-lg">
              {event.attendees}/{event.capacity}
            </div>
            <div className="text-emerald-300 font-mono text-sm mt-2">ATTENDING</div>
          </div>
        </section>

        {/* Description Section */}
        <section className="max-w-4xl mx-auto px-8 py-6">
          <h2 className="text-emerald-500 font-mono font-bold text-2xl mb-4">&gt; EVENT_DESCRIPTION.txt</h2>
          <div className="border border-emerald-500/30 p-8 bg-black/50">
            <p className="text-gray-300 font-mono text-base leading-relaxed">{event.fullDescription}</p>
          </div>
        </section>

        {/* Further Details Section */}
        <section className="max-w-4xl mx-auto px-8 pb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-emerald-500/30 p-6 bg-black/50">
            <div className="text-emerald-500 font-mono text-sm font-bold mb-2">CATEGORY:</div>
            <div className="text-white font-mono text-lg">{event.category}</div>
          </div>
          <div className="border border-emerald-500/30 p-6 bg-black/50">
            <div className="text-emerald-500 font-mono text-sm font-bold mb-2">EVENT_ID:</div>
            <div className="text-white font-mono text-lg">{String(event.id).padStart(3, "0")}</div>
          </div>
        </section>

        {/* Action Section */}
        <section className="max-w-4xl mx-auto px-8 pb-16 text-center">
          <button
            type="button"
            className="font-mono font-bold px-8 py-4 border-2 border-emerald-500 bg-black text-emerald-500 cursor-pointer transition-all duration-300 text-lg hover:bg-emerald-500 hover:text-black"
          >
            [+] REGISTER_FOR_EVENT
          </button>
        </section>
      </div>
    </main>
  );
}
