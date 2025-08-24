import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, Calendar, FileText, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate, getPostBySlug, getWordCount } from '@/lib/posts';

export const Route = createFileRoute('/blog/$slug')({
  component: RouteComponent,
});

type BlogPostPageProperties = {
  params: { slug: string };
};

function RouteComponent() {
  const { slug } = Route.useParams();

  return (
    <BlogPostPage
      params={{
        slug,
      }}
    />
  );
}

function BlogPostPage({ params }: BlogPostPageProperties) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    // Rely on the app/not-found.tsx route
    throw new Error('Not found');
  }

  const wordCount = getWordCount(post.content);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <Button asChild className="mb-6 rounded-xl" variant="ghost">
          <Link to="/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <article>
          <header className="mb-6">
            <h1 className="mb-3 font-bold text-4xl">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.date)}</span>
              <User className="ml-2 h-4 w-4" />
              <span>{post.author}</span>
              <FileText className="ml-2 h-4 w-4" />
              <span>{wordCount} words</span>
            </div>
            {post.excerpt ? <p className="mt-3 text-muted-foreground">{post.excerpt}</p> : null}
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none">{post.content}</div>
        </article>
      </div>
    </div>
  );
}
