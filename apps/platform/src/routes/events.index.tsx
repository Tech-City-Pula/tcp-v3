import { createFileRoute, Link } from "@tanstack/react-router";
import { mockEvents } from "@/lib/events";

export const Route = createFileRoute("/events/")({
  component: RouteComponent,
});

function RouteComponent() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black text-emerald-500 relative overflow-x-hidden">
      {/* background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,rgba(16,185,129,0.3)_1px,transparent_1px),linear-gradient(rgba(16,185,129,0.3)_1px,transparent_1px)] bg-[length:20px_20px] animate-[matrix_20s_linear_infinite] z-0"></div>

      <div className="max-w-[1200px] mx-auto p-8 relative z-10">
        <Link to="/" className="text-white underline">
          Home
        </Link>
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-500 mb-4 font-mono tracking-wide">
            <span className="text-white">[</span>EVENTS<span className="text-white">]</span>
          </h1>
          <p className="text-lg text-emerald-300 font-mono mb-4">&gt; Connecting_minds.exe --location=pula</p>
          <div className="flex justify-center mt-4">
            <span className="border-2 border-emerald-500 px-4 py-2 bg-black/80 text-emerald-500 font-mono text-sm font-bold">
              STATUS: {mockEvents.length} EVENTS_LOADED
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockEvents.map((event) => (
            <Link
              to="/events/$eventId"
              params={{
                eventId: String(event.id),
              }}
              key={event.id}
              className="bg-black border-2 border-emerald-500/30 cursor-pointer transition-all duration-300 overflow-hidden hover:border-emerald-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-3 right-3 bg-emerald-500 text-black px-2 py-1 font-mono text-xs font-bold">
                  {event.category.toUpperCase()}
                </div>
                <div className="absolute bottom-3 left-3 text-emerald-500 font-mono text-xs font-bold">
                  [{String(event.id).padStart(3, "0")}]
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-emerald-500 font-mono font-bold text-lg mb-4 transition-colors duration-300 group-hover:text-white">
                  {event.title}
                </h3>

                <div className="mb-4">
                  <div className="text-emerald-300 font-mono text-sm mb-2">
                    <span className="text-white font-bold">&gt;</span> {formatDate(event.date)} @ {event.time}
                  </div>
                  <div className="text-emerald-300 font-mono text-sm mb-2">
                    <span className="text-white font-bold">&gt;</span> {event.location}
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">{event.shortDescription}</p>

                <div className="flex justify-between items-center">
                  <span className="text-emerald-300 font-mono text-xs font-bold">
                    [{event.attendees}/{event.capacity}] ATTENDING
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
