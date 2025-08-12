import { Link } from '@tanstack/react-router';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

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
        <div className="flex-1">
          <Link className="font-semibold text-lg" to="/">
            My Blog
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button aria-label="Toggle theme" className="rounded-xl" onClick={toggle} size="sm" variant="outline">
            {theme === 'dark' ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
