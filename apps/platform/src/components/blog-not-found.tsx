import { Button } from '@repo/ui/components/shadcn/button';
import { Link } from '@tanstack/react-router';
import { Home } from 'lucide-react';

export function BlogNotFound() {
  return (
    <div>
      <div>
        <h1>Post Not Found</h1>
        <p>The blog post you are looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link to="/blogs">
            <Home />
            Back to Blog
          </Link>
        </Button>
      </div>
    </div>
  );
}
