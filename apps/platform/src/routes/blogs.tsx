import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { Button } from '@repo/ui/components/shadcn/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { Input } from '@repo/ui/components/shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/shadcn/select';
import { Separator } from '@repo/ui/components/shadcn/separator';
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
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Blog</CardTitle>
          <CardDescription>Insights and tutorials on web development and technology.</CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  name="search"
                  placeholder="Search blog posts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                name="order"
                value={order}
                onValueChange={(value) => setOrder(value as 'newest' | 'oldest')}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit">Apply</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {searchParams.search && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              Found {blogs.length} post{blogs.length === 1 ? '' : 's'} for "{searchParams.search}"
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {blogs.map((blog) => (
          <BlogPostListItem key={blog.id} blog={blog} />
        ))}
        {blogs.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No posts found. Try a different search.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
