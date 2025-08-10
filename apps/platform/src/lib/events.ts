export interface Event {
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

export const mockEvents: Event[] = [
  {
    id: 1,
    title: "Matrix Quantum Conference 2025",
    date: "2025-08-15",
    time: "09:00",
    location: "Pula Arena",
    shortDescription:
      "Dive deep into quantum computing and explore the intersection of quantum mechanics and digital reality at this cutting-edge conference.",
    fullDescription:
      "The Matrix Quantum Conference 2025 brings together quantum physicists, computer scientists, and digital architects for an exploration of quantum computing's role in reshaping our digital landscape. Discover quantum algorithms, quantum cryptography, and the future of computational reality. Network with leading researchers and witness live quantum demonstrations in the historic Pula Arena.",
    imageUrl: "/images/events/matrix-quantum-conference.png",
    category: "Quantum",
    capacity: 200,
    attendees: 45,
  },
  {
    id: 2,
    title: "Digital Marketing Matrix Workshop",
    date: "2025-08-20",
    time: "14:00",
    location: "Tech City Hub",
    shortDescription:
      "Master the art of digital marketing in the age of AI and data-driven decision making.",
    fullDescription:
      "Transform your marketing approach with cutting-edge digital strategies, AI-powered analytics, and data visualization techniques. Learn to navigate the complex matrix of modern digital marketing, from neural network-based customer segmentation to algorithmic content optimization. This hands-on workshop combines traditional marketing wisdom with futuristic tech approaches.",
    imageUrl: "/images/events/marketing-workshop.jpg",
    category: "Marketing",
    capacity: 50,
    attendees: 23,
  },
  {
    id: 3,
    title: "Cyberpunk Hackathon 2025",
    date: "2025-08-25",
    time: "18:30",
    location: "Innovation Center",
    shortDescription:
      "48-hour coding marathon in a cyberpunk-themed environment. Build the future, hack the matrix.",
    fullDescription:
      "Enter the digital underground at Pula's most intense hackathon. Teams will compete to build innovative solutions using cutting-edge technologies including AI, blockchain, and neural interfaces. The cyberpunk aesthetic meets serious coding as participants work through the night in a neon-lit environment, fueled by energy drinks and the drive to create revolutionary software.",
    imageUrl: "/images/events/cyberpunk-hackathon.png",
    category: "Hackathon",
    capacity: 100,
    attendees: 67,
  },
  {
    id: 4,
    title: "Edge Computing & AI Workshop",
    date: "2025-09-02",
    time: "10:00",
    location: "University of Pula",
    shortDescription:
      "Explore the convergence of edge computing and artificial intelligence in real-time applications.",
    fullDescription:
      "Dive into the world of distributed computing where AI meets the edge. Learn to deploy machine learning models on edge devices, optimize for low-latency applications, and build intelligent systems that process data at the source. This technical workshop covers everything from IoT integration to real-time neural network inference in resource-constrained environments.",
    imageUrl: "/images/events/matrix-edge-computing-ai-workshop-terminal-green.png",
    category: "AI/Edge",
    capacity: 150,
    attendees: 89,
  },
  {
    id: 5,
    title: "Neural Graphics & Visualization Lab",
    date: "2025-09-10",
    time: "09:00",
    location: "Code Academy Pula",
    shortDescription:
      "Advanced computer graphics techniques using neural networks and machine learning for stunning visualizations.",
    fullDescription:
      "Push the boundaries of computer graphics with neural network-powered rendering techniques. Learn to create stunning visualizations using GANs, neural style transfer, and AI-enhanced rendering pipelines. This intensive lab session covers everything from procedural generation to real-time neural rendering, perfect for game developers, visual artists, and graphics programmers.",
    imageUrl: "/images/events/matrix-neural-graphics.png",
    category: "Graphics",
    capacity: 80,
    attendees: 34,
  },
  {
    id: 6,
    title: "Cryptography & Security Lab",
    date: "2025-09-15",
    time: "16:00",
    location: "Business Center Pula",
    shortDescription:
      "Deep dive into modern cryptography, zero-knowledge proofs, and advanced security protocols.",
    fullDescription:
      "Master the art of digital security in an increasingly connected world. This advanced lab covers quantum-resistant cryptography, zero-knowledge protocols, and cutting-edge security implementations. Participants will work with real cryptographic challenges, learn to implement secure communication protocols, and explore the future of digital privacy and security.",
    imageUrl: "/images/events/matrix-cryptography-lab.png",
    category: "Security",
    capacity: 120,
    attendees: 78,
  },
  {
    id: 7,
    title: "Matrix Dashboard Analytics Summit",
    date: "2025-09-20",
    time: "14:00",
    location: "Digital Hub Pula",
    shortDescription:
      "Advanced data visualization and real-time analytics dashboard development using modern web technologies.",
    fullDescription:
      "Transform raw data into actionable insights with advanced dashboard development techniques. Learn to build real-time analytics platforms, create stunning data visualizations, and implement responsive dashboard architectures. This summit covers everything from D3.js mastery to real-time data streaming, perfect for data scientists, developers, and business intelligence professionals.",
    imageUrl: "/images/events/matrix-dashboard.png",
    category: "Analytics",
    capacity: 90,
    attendees: 56,
  },
]
