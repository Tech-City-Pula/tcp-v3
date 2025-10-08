import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { Input } from '@repo/ui/components/shadcn/input';
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
    <div>
      <div>
        <div>
          <h1>My Blog</h1>
          <p>Insights and tutorials on web development and technology.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <Search />
              <Input
                aria-label="Search blog posts"
                name="search"
                placeholder="Search blog posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <select
                name="order"
                value={order}
                onChange={(e) => setOrder(e.target.value as 'newest' | 'oldest')}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
            <button
              type="submit"
            >
              Apply
            </button>
          </div>
        </form>
        {searchParams.search ? (
          <div>
            Found {blogs.length} post{blogs.length === 1 ? '' : 's'} for "{searchParams.search}"
          </div>
        ) : null}
        <div>
          {blogs.map((blog) => (
            <BlogPostListItem key={blog.id} blog={blog} />
          ))}
          {blogs.length === 0 ? (
            <div>
              No posts found. Try a different search.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
