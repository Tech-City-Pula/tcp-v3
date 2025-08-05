import { createFileRoute } from '@tanstack/react-router'
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
    <div className="events-page">
      {/* background pattern */}
      <div className="matrix-background"></div>
      
      <div className="container">
        <header className="page-header">
          <h1 className="main-title">
            <span className="bracket">[</span>EVENTS<span className="bracket">]</span>
          </h1>
          <p className="subtitle">
            &gt; Connecting_minds.exe --location=pula
          </p>
          <div className="status-bar">
            <span className="status-text">
              STATUS: {mockEvents.length} EVENTS_LOADED
            </span>
          </div>
        </header>

        <div className="events-grid">
          {mockEvents.map((event) => (
            <div 
              key={event.id} 
              className="event-card"
              onClick={() => handleEventClick(event)}
            >
              <div className="event-image">
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="card-image"
                />
                <div className="image-overlay"></div>
                <div className="event-category">
                  {event.category.toUpperCase()}
                </div>
                <div className="event-id">
                  [{String(event.id).padStart(3, '0')}]
                </div>
              </div>
              
              <div className="event-content">
                <h3 className="event-title">
                  {event.title}
                </h3>
                
                <div className="event-meta">
                  <div className="meta-item">
                    <span className="prompt">&gt;</span> {formatDate(event.date)} @ {event.time}
                  </div>
                  <div className="meta-item">
                    <span className="prompt">&gt;</span> {event.location}
                  </div>
                </div>
                
                <p className="event-description">
                  {event.shortDescription}
                </p>
                
                <div className="event-stats">
                  <span className="attendees">
                    [{event.attendees}/{event.capacity}] ATTENDING
                  </span>
                  {interestedEvents.has(event.id) && (
                    <span className="interested-badge">
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
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={handleCloseModal}
            >
              ×
            </button>
            
            <div className="modal-header">
              <img 
                src={selectedEvent.imageUrl} 
                alt={selectedEvent.title}
                className="modal-image"
              />
              <div className="modal-overlay-gradient"></div>
              
              <div className="modal-title-section">
                <div className="modal-category">
                  {selectedEvent.category.toUpperCase()}
                </div>
                <h2 className="modal-title">
                  [{String(selectedEvent.id).padStart(3, '0')}] {selectedEvent.title}
                </h2>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-details">
                <div className="detail-box">
                  <div className="detail-label">DATE_TIME:</div>
                  <div className="detail-value">
                    {formatDate(selectedEvent.date)} @ {selectedEvent.time}
                  </div>
                </div>
                <div className="detail-box">
                  <div className="detail-label">LOCATION:</div>
                  <div className="detail-value">{selectedEvent.location}</div>
                </div>
                <div className="detail-box">
                  <div className="detail-label">CAPACITY:</div>
                  <div className="detail-value">
                    {selectedEvent.attendees}/{selectedEvent.capacity}
                  </div>
                </div>
              </div>

              <div className="description-section">
                <h3 className="description-title">
                  &gt; EVENT_DESCRIPTION.txt
                </h3>
                <div className="description-box">
                  <p className="description-text">
                    {selectedEvent.fullDescription}
                  </p>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className={`interest-button ${interestedEvents.has(selectedEvent.id) ? 'interested' : ''}`}
                  onClick={() => handleMarkInterest(selectedEvent.id)}
                >
                  {interestedEvents.has(selectedEvent.id) ? '[✓] INTERESTED' : '[+] MARK_INTEREST'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .events-page {
          min-height: 100vh;
          background-color: #000000;
          color: #10b981;
          position: relative;
          overflow-x: hidden;
        }

        .matrix-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
          background-image: 
            linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px);
          background-size: 20px 20px;
          animation: matrix 20s linear infinite;
          z-index: 1;
        }

        @keyframes matrix {
          0% { transform: translateY(0); }
          100% { transform: translateY(20px); }
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          position: relative;
          z-index: 10;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .main-title {
          font-size: 4rem;
          font-weight: bold;
          color: #10b981;
          margin-bottom: 1rem;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.1em;
        }

        .bracket {
          color: #ffffff;
        }

        .subtitle {
          font-size: 1.25rem;
          color: #34d399;
          font-family: 'Courier New', monospace;
          margin-bottom: 1rem;
        }

        .status-bar {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }

        .status-text {
          border: 2px solid #10b981;
          padding: 0.5rem 1rem;
          background-color: rgba(0, 0, 0, 0.8);
          color: #10b981;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          font-weight: bold;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .event-card {
          background-color: #000000;
          border: 2px solid rgba(16, 185, 129, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .event-card:hover {
          border-color: #10b981;
          transform: scale(1.02);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
        }

        .event-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%);
          transition: filter 0.3s ease;
        }

        .event-card:hover .card-image {
          filter: grayscale(0%);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
        }

        .event-category {
          position: absolute;
          top: 12px;
          right: 12px;
          background-color: #10b981;
          color: #000000;
          padding: 0.25rem 0.75rem;
          font-family: 'Courier New', monospace;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .event-id {
          position: absolute;
          bottom: 12px;
          left: 12px;
          color: #10b981;
          font-family: 'Courier New', monospace;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .event-content {
          padding: 1.5rem;
        }

        .event-title {
          color: #10b981;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          font-size: 1.125rem;
          margin-bottom: 1rem;
          transition: color 0.3s ease;
        }

        .event-card:hover .event-title {
          color: #ffffff;
        }

        .event-meta {
          margin-bottom: 1rem;
        }

        .meta-item {
          color: #34d399;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .prompt {
          color: #ffffff;
          font-weight: bold;
        }

        .event-description {
          color: #9ca3af;
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .event-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .attendees {
          color: #34d399;
          font-family: 'Courier New', monospace;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .interested-badge {
          background-color: #10b981;
          color: #000000;
          padding: 0.25rem 0.5rem;
          font-family: 'Courier New', monospace;
          font-size: 0.75rem;
          font-weight: bold;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background-color: #000000;
          border: 2px solid #10b981;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background-color: rgba(0, 0, 0, 0.8);
          border: 2px solid #10b981;
          color: #10b981;
          width: 2rem;
          height: 2rem;
          cursor: pointer;
          font-family: 'Courier New', monospace;
          font-size: 1.25rem;
          z-index: 10;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          color: #ffffff;
          border-color: #ffffff;
        }

        .modal-header {
          position: relative;
        }

        .modal-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          filter: grayscale(100%);
        }

        .modal-overlay-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3));
        }

        .modal-title-section {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem 1.5rem 1.5rem;
        }

        .modal-category {
          background-color: #10b981;
          color: #000000;
          padding: 0.25rem 0.75rem;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          font-weight: bold;
          display: inline-block;
          margin-bottom: 0.75rem;
        }

        .modal-title {
          font-size: 1.75rem;
          font-weight: bold;
          color: #10b981;
          font-family: 'Courier New', monospace;
          margin: 0;
          line-height: 1.3;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .modal-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .detail-box {
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 1rem;
        }

        .detail-label {
          color: #10b981;
          font-family: 'Courier New', monospace;
          font-size: 0.75rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .detail-value {
          color: #ffffff;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
        }

        .description-section {
          margin-bottom: 2rem;
        }

        .description-title {
          color: #10b981;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          font-size: 1.125rem;
          margin-bottom: 1rem;
        }

        .description-box {
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 1rem;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .description-text {
          color: #d1d5db;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          line-height: 1.7;
          margin: 0;
        }

        .modal-actions {
          text-align: center;
        }

        .interest-button {
          font-family: 'Courier New', monospace;
          font-weight: bold;
          padding: 0.75rem 2rem;
          border: 2px solid #10b981;
          background-color: #000000;
          color: #10b981;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .interest-button:hover {
          background-color: #10b981;
          color: #000000;
        }

        .interest-button.interested {
          background-color: #10b981;
          color: #000000;
        }

        .interest-button.interested:hover {
          background-color: #34d399;
        }

        /* Custom scrollbar */
        .modal-content::-webkit-scrollbar {
          width: 8px;
        }
        
        .modal-content::-webkit-scrollbar-track {
          background: #000000;
        }
        
        .modal-content::-webkit-scrollbar-thumb {
          background: #10b981;
        }
        
        .modal-content::-webkit-scrollbar-thumb:hover {
          background: #34d399;
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2.5rem;
          }
          
          .events-grid {
            grid-template-columns: 1fr;
          }
          
          .modal-details {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
