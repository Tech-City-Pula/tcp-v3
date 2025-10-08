import { Button } from '@repo/ui/components/shadcn/button';
import { Link } from '@tanstack/react-router';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

function useThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // initial from prefers or existing
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initial = saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return { theme, toggle };
}

export function Navbar() {
  const { theme, toggle } = useThemeToggle();

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex flex-1 items-center gap-6">
          <Link to="/" className="font-medium text-sm transition-colors hover:text-primary [&.active]:text-primary">
            Home
          </Link>
          <Link
            to="/about"
            className="font-medium text-sm transition-colors hover:text-primary [&.active]:text-primary"
          >
            About
          </Link>
          <Link
            to="/events"
            className="font-medium text-sm transition-colors hover:text-primary [&.active]:text-primary"
          >
            Events
          </Link>
          <Link
            to="/blogs"
            className="font-medium text-sm transition-colors hover:text-primary [&.active]:text-primary"
          >
            Blog
          </Link>
          <Link
            to="/learn"
            className="font-medium text-sm transition-colors hover:text-primary [&.active]:text-primary"
          >
            Learn
          </Link>
          <Link
            to="/contact"
            className="font-medium text-sm transition-colors hover:text-primary [&.active]:text-primary"
          >
            Contact
          </Link>
          <Link
            to="/submit-talk"
            className="font-medium text-sm transition-colors hover:text-primary [&.active]:text-primary"
          >
            Submit Talk
          </Link>
        </nav>
        <Button aria-label="Toggle theme" onClick={toggle} size="sm" variant="outline">
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
}
