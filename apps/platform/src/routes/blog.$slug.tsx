import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { RichTextOutput } from '@repo/ui/components/rich-text-output';
import { Button } from '@repo/ui/components/shadcn/button';
import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { eq } from 'drizzle-orm';
import { ArrowLeft, Calendar } from 'lucide-react';
import z from 'zod';
import { formatDate } from '@/lib/posts';

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
  async loader({ params }) {
    const blog = await getBlogById({
      data: {
        id: params.slug,
      },
    });
    return blog;
  },
});

type BlogPost = typeof schema.blogs.$inferSelect;
type BlogPostPageProperties = { blog: BlogPost };

function RouteComponent() {
  const blog = Route.useLoaderData();
  return <BlogPostPage blog={blog} />;
}

function BlogPostPage({ blog }: BlogPostPageProperties) {
  return (
    <div>
      <div>
        <Button asChild variant="ghost">
          <Link to="/blogs">
            <ArrowLeft />
            Back to Blog
          </Link>
        </Button>

        <article>
          <header>
            <h1>{blog.title}</h1>
            <div>
              <Calendar />
              <span>{formatDate(blog.createdAt.toISOString())}</span>
            </div>
          </header>

          <RichTextOutput markdown={blog.content} />
        </article>
      </div>
    </div>
  );
}
