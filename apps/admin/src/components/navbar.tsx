import { Link } from '@tanstack/react-router';

export function Navbar() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/events">Events</Link>
        <Link to="/members">Members</Link>
      </nav>
    </header>
  );
}
