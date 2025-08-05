import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

// Mock data - will be replaced with real data later
const mockEvents = [
  {
    id: 1,
    title: "Tech Innovation Summit 2025",
    date: "2025-08-15",
    time: "09:00",
    location: "Pula Arena",
    shortDescription: "Join industry leaders and innovators at the Tech Innovation Summit 2025 to explore the latest advancements in technology and digital transformation.",
    fullDescription: "The Tech Innovation Summit 2025 brings together visionaries, entrepreneurs, and tech professionals for a day of inspiring talks, hands-on workshops, and networking opportunities. Discover cutting-edge solutions, learn from expert panels, and connect with peers in the historic Pula Arena. Whether you're a startup founder or a seasoned developer, this event offers valuable insights into the future of technology.",
    imageUrl: "https://via.placeholder.com/400x200",
    category: "Technology",
    capacity: 200,
    attendees: 45
  },
  {
    id: 2,
    title: "Digital Marketing Workshop",
    date: "2025-08-20",
    time: "14:00",
    location: "Tech City Hub",
    shortDescription: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    fullDescription: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris viverra veniam sit amet lacus cursus. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.",
    imageUrl: "https://via.placeholder.com/400x200",
    category: "Marketing",
    capacity: 50,
    attendees: 23
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    date: "2025-08-25",
    time: "18:30",
    location: "Innovation Center",
    shortDescription: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    fullDescription: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.",
    imageUrl: "https://via.placeholder.com/400x200",
    category: "Entrepreneurship",
    capacity: 100,
    attendees: 67
  },
  {
    id: 4,
    title: "AI & Machine Learning Symposium",
    date: "2025-09-02",
    time: "10:00",
    location: "University of Pula",
    shortDescription: "Cras dapibus vivamus elementum semper nisi aenean vulputate eleifend tellus.",
    fullDescription: "Cras dapibus vivamus elementum semper nisi aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum aenean imperdiet etiam ultricies nisi vel augue.",
    imageUrl: "https://via.placeholder.com/400x200",
    category: "AI/ML",
    capacity: 150,
    attendees: 89
  },
  {
    id: 5,
    title: "Web Development Bootcamp",
    date: "2025-09-10",
    time: "09:00",
    location: "Code Academy Pula",
    shortDescription: "Nam quam nunc blandit vel luctus pulvinar hendrerit id lorem maecenas nec odio.",
    fullDescription: "Nam quam nunc blandit vel luctus pulvinar hendrerit id lorem maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante etiam sit amet orci eget eros faucibus tincidunt. Duis leo sed fringilla mauris sit amet nibh donec sodales sagittis magna.",
    imageUrl: "https://via.placeholder.com/400x200",
    category: "Development",
    capacity: 80,
    attendees: 34
  },
  {
    id: 6,
    title: "Blockchain & Cryptocurrency Forum",
    date: "2025-09-15",
    time: "16:00",
    location: "Business Center Pula",
    shortDescription: "Sed consequat leo eget bibendum sodales augue velit cursus nunc quis gravida magna.",
    fullDescription: "Sed consequat leo eget bibendum sodales augue velit cursus nunc quis gravida magna mi a libero. Fusce vulputate eleifend sapien vestibulum purus quam scelerisque ut molestie. Sed posuere consectetur est at lobortis etiam porta sem malesuada magna mollis euismod.",
    imageUrl: "https://via.placeholder.com/400x200",
    category: "Blockchain",
    capacity: 120,
    attendees: 78
  }
]

export const Route = createFileRoute('/events')({
  component: RouteComponent,
})

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  shortDescription: string
  fullDescription: string
  imageUrl: string
  category: string
  capacity: number
  attendees: number
}

function RouteComponent() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [interestedEvents, setInterestedEvents] = useState<Set<number>>(new Set())

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
  }

  const handleCloseModal = () => {
    setSelectedEvent(null)
  }

  const handleMarkInterest = (eventId: number) => {
    setInterestedEvents(prev => {
      const newSet = new Set(prev)
      if (newSet.has(eventId)) {
        newSet.delete(eventId)
      } else {
        newSet.add(eventId)
      }
      return newSet
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-black text-emerald-500 relative overflow-x-hidden">
      {/* background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,rgba(16,185,129,0.3)_1px,transparent_1px),linear-gradient(rgba(16,185,129,0.3)_1px,transparent_1px)] bg-[length:20px_20px] animate-[matrix_20s_linear_infinite] z-0"></div>

      <div className="max-w-[1200px] mx-auto p-8 relative z-10">
        <Link to='/' className="text-white underline">Home</Link>
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-500 mb-4 font-mono tracking-wide">
            <span className="text-white">[</span>EVENTS<span className="text-white">]</span>
          </h1>
          <p className="text-lg text-emerald-300 font-mono mb-4">
            &gt; Connecting_minds.exe --location=pula
          </p>
          <div className="flex justify-center mt-4">
            <span className="border-2 border-emerald-500 px-4 py-2 bg-black/80 text-emerald-500 font-mono text-sm font-bold">
              STATUS: {mockEvents.length} EVENTS_LOADED
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-black border-2 border-emerald-500/30 cursor-pointer transition-all duration-300 overflow-hidden hover:border-emerald-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              onClick={() => handleEventClick(event)}
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
                  [{String(event.id).padStart(3, '0')}]
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

                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {event.shortDescription}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-emerald-300 font-mono text-xs font-bold">
                    [{event.attendees}/{event.capacity}] ATTENDING
                  </span>
                  {interestedEvents.has(event.id) && (
                    <span className="bg-emerald-500 text-black px-2 py-1 font-mono text-xs font-bold">
                      INTERESTED
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[1000] p-4" onClick={handleCloseModal}>
          <div className="bg-black border-2 border-emerald-500 max-w-xl w-full max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 bg-black/80 border-2 border-emerald-500 text-emerald-500 w-8 h-8 cursor-pointer font-mono text-xl z-10 transition-all duration-300 hover:text-white hover:border-white"
              onClick={handleCloseModal}
            >
              ×
            </button>

            <div className="relative">
              <img 
                src={selectedEvent.imageUrl} 
                alt={selectedEvent.title}
                className="w-full h-[250px] object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30"></div>

              <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-8">
                <div className="bg-emerald-500 text-black px-2 py-1 font-mono text-sm font-bold inline-block mb-3">
                  {selectedEvent.category.toUpperCase()}
                </div>
                <h2 className="text-emerald-500 font-mono font-bold text-2xl m-0 leading-tight">
                  [{String(selectedEvent.id).padStart(3, '0')}] {selectedEvent.title}
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="border border-emerald-500/30 p-4">
                  <div className="text-emerald-500 font-mono text-xs font-bold mb-2">DATE_TIME:</div>
                  <div className="text-white font-mono text-sm">
                    {formatDate(selectedEvent.date)} @ {selectedEvent.time}
                  </div>
                </div>
                <div className="border border-emerald-500/30 p-4">
                  <div className="text-emerald-500 font-mono text-xs font-bold mb-2">LOCATION:</div>
                  <div className="text-white font-mono text-sm">{selectedEvent.location}</div>
                </div>
                <div className="border border-emerald-500/30 p-4">
                  <div className="text-emerald-500 font-mono text-xs font-bold mb-2">CAPACITY:</div>
                  <div className="text-white font-mono text-sm">
                    {selectedEvent.attendees}/{selectedEvent.capacity}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-emerald-500 font-mono font-bold text-lg mb-4">&gt; EVENT_DESCRIPTION.txt</h3>
                <div className="border border-emerald-500/30 p-4 bg-black/50">
                  <p className="text-gray-300 font-mono text-sm leading-relaxed m-0">
                    {selectedEvent.fullDescription}
                  </p>
                </div>
              </div>

              <div className="text-center">
                <button 
                  className={`font-mono font-bold px-8 py-3 border-2 border-emerald-500 bg-black text-emerald-500 cursor-pointer transition-all duration-300 text-base ${interestedEvents.has(selectedEvent.id) ? 'bg-emerald-500 text-black hover:bg-emerald-300' : 'hover:bg-emerald-500 hover:text-black'}`}
                  onClick={() => handleMarkInterest(selectedEvent.id)}
                >
                  {interestedEvents.has(selectedEvent.id) ? '[✓] INTERESTED' : '[+] MARK_INTEREST'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
