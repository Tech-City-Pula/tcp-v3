import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { Button } from '@repo/ui/components/shadcn/button';
import { Input } from '@repo/ui/components/shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/shadcn/select';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { asc, desc, ilike } from 'drizzle-orm';
import { Search } from 'lucide-react';
import { useState } from 'react';
import z from 'zod';
import { BlogPostListItem } from '@/components/blog-post-list-item';

// Shared validator for search params + server fn input
const searchSchema = z.object({
  search: z.string().optional().default(''),
  page: z.coerce.number().int().positive().default(1),
  order: z.enum(['newest', 'oldest']).optional().default('newest'),
});

// Server function (GET) - list blogs
export const getBlogs = createServerFn({ method: 'GET' })
  .validator(searchSchema)
  .handler(async ({ data }) => {
    const pageSize = 10;
    const page = data.page - 1; // zero-index
    const query = db
      .select()
      .from(schema.blogs)
      .where(ilike(schema.blogs.title, `%${data.search}%`))
      .orderBy(data.order === 'newest' ? desc(schema.blogs.createdAt) : asc(schema.blogs.createdAt))
      .limit(pageSize)
      .offset(page * pageSize);
    return await query;
  });

export const Route = createFileRoute('/blogs')({
  validateSearch: searchSchema,
  async beforeLoad(ctx) {
    const blogs = await getBlogs({
      data: {
        search: ctx.search.search,
        page: ctx.search.page,
        order: ctx.search.order,
      },
    });
    return { blogs };
  },
  loader: (ctx) => ctx.context.blogs,
  component: BlogPage,
});

function BlogPage() {
  const blogs = Route.useLoaderData();
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();

  const [search, setSearch] = useState(searchParams.search ?? '');
  const [order, setOrder] = useState<'newest' | 'oldest'>(searchParams.order ?? 'newest');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate({
      search: (prev) => ({
        ...prev,
        search,
        order,
        page: 1,
      }),
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-bold text-4xl">My Blog</h1>
          <p className="text-lg text-muted-foreground">Insights and tutorials on web development and technology.</p>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mb-6 max-w-3xl">
          <div className="flex flex-col items-stretch gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
              <Input
                aria-label="Search blog posts"
                name="search"
                className="rounded-xl pl-10"
                placeholder="Search blog posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                name="order"
                value={order}
                onValueChange={(value) => setOrder(value as 'newest' | 'oldest')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" size="default">
              Apply
            </Button>
          </div>
        </form>
        {searchParams.search ? (
          <div className="mb-4 text-center text-muted-foreground text-sm">
            Found {blogs.length} post{blogs.length === 1 ? '' : 's'} for "{searchParams.search}"
          </div>
        ) : null}
        <div className="mx-auto max-w-3xl space-y-6">
          {blogs.map((blog) => (
            <BlogPostListItem key={blog.id} blog={blog} />
          ))}
          {blogs.length === 0 ? (
            <div className="rounded-xl border py-12 text-center text-muted-foreground">
              No posts found. Try a different search.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
