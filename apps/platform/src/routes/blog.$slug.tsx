import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { eq } from 'drizzle-orm';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { formatDate, getWordCount } from '@/lib/posts';

const getBlogById = createServerFn()
  .validator(
    z.object({
      id: z.string(),
    })
  )
  .handler(async (args) => {
    const [blog] = await db.select().from(schema.blogs).where(eq(schema.blogs.id, args.data.id)).limit(1);
    if (!blog) {
      throw new Error('Not found');
    }
    return blog;
  });

export const Route = createFileRoute('/blog/$slug')({
  component: RouteComponent,
  loader({ params }) {
    return getBlogById({
      data: {
        id: params.slug,
      },
    });
  },
});

type BlogPost = typeof schema.blogs.$inferSelect;
type BlogPostPageProperties = { blog: BlogPost };

function RouteComponent() {
  const blog = Route.useLoaderData();
  return <BlogPostPage blog={blog} />;
}

function BlogPostPage({ blog }: BlogPostPageProperties) {
  const wordCount = getWordCount(blog.content);

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
            <h1 className="mb-3 font-bold text-4xl">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.createdAt.toISOString())}</span>
              <FileText className="ml-2 h-4 w-4" />
              <span>{wordCount} words</span>
            </div>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none whitespace-pre-wrap">{blog.content}</div>
        </article>
      </div>
    </div>
  );
}
