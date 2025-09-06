import { Link } from '@tanstack/react-router';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeToggle } from '@/hooks/use-theme-toggle';

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
