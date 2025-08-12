import { Link } from '@tanstack/react-router';
import { Home } from 'lucide-react';
import { Button } from './ui/button';

export function BlogNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="space-y-4 px-4 text-center">
        <h1 className="font-bold text-3xl">Post Not Found</h1>
        <p className="text-muted-foreground">The blog post you are looking for doesn&apos;t exist.</p>
        <Button asChild className="rounded-xl">
          <Link to="/blogs">
            <Home className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
    </div>
  );
}
