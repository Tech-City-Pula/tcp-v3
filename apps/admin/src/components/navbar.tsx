import { Link } from '@tanstack/react-router';

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex gap-6 py-4">
          <Link to="/" className="hover:underline" activeProps={{ className: 'font-bold' }}>
            Home
          </Link>
          <Link to="/blogs" className="hover:underline" activeProps={{ className: 'font-bold' }}>
            Blogs
          </Link>
          <Link to="/events" className="hover:underline" activeProps={{ className: 'font-bold' }}>
            Events
          </Link>
          <Link to="/members" className="hover:underline" activeProps={{ className: 'font-bold' }}>
            Members
          </Link>
        </nav>
      </div>
    </header>
  );
}
