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
    <header className="sticky top-0 z-10 border-b bg-background/70 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center px-4">
        <nav className="flex items-center gap-4">
          <Link to="/about">/about</Link>
          <Link to="/blogs">/blogs</Link>
          <Link to="/events">/events</Link>
          <Link to="/learn">/learn</Link>
          <Link to="/contact">/contact</Link>
          <Link to="/submit-talk">/submit-talk</Link>
        </nav>
        <Button
          aria-label="Toggle theme"
          className="ml-auto flex size-8 items-center justify-center"
          onClick={toggle}
          size="sm"
          variant="outline"
        >
          {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </div>
    </header>
  );
}
