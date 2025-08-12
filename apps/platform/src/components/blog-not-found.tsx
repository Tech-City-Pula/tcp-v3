import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { Button } from "./ui/button";

export function BlogNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4 px-4">
        <h1 className="text-3xl font-bold">Post Not Found</h1>
        <p className="text-muted-foreground">The blog post you are looking for doesn&apos;t exist.</p>
        <Button asChild className="rounded-xl">
          <Link to="/blogs">
            <Home className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>
    </div>
  );
}
