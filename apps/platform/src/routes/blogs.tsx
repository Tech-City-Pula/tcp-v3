import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { BlogPostListItem } from '@/components/blog-post-list-item';
import { Navbar } from '@/components/navbar';
import { Input } from '@/components/ui/input';

const getAllBlogs = createServerFn().handler(async () => {
  return await db.select().from(schema.blogs);
});

export const Route = createFileRoute('/blogs')({
  component: RouteComponent,
  loader() {
    return getAllBlogs();
  },
});

function RouteComponent() {
  return <BlogPage />;
}

function BlogPage() {
  const allBlogs = Route.useLoaderData();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');

  const hasSearchTerm = search.trim().length > 0;

  const filteredBlogsBySearchTerm = hasSearchTerm
    ? allBlogs.filter((blog) => {
        const title = blog.title;

        const hasTitleInSearch = title.toLowerCase().includes(search.toLocaleLowerCase());

        return hasTitleInSearch;
      })
    : allBlogs;

  const sortedFilteredBlogs = filteredBlogsBySearchTerm.sort((a, b) => {
    if (sort === 'newest') {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }

    return a.createdAt.getTime() - b.createdAt.getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-bold text-4xl">My Blog</h1>
          <p className="text-lg text-muted-foreground">Insights and tutorials on web development and technology.</p>
        </div>

        {/* Search + Sort */}
        <div className="mx-auto mb-6 max-w-3xl">
          <div className="flex flex-col items-stretch gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
              <Input
                aria-label="Search blog posts"
                className="rounded-xl pl-10"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search blog posts..."
                value={search}
              />
            </div>
            <div className="w-full sm:w-64">
              <select value={sort} onChange={(e) => setSort(e.target.value as 'newest' | 'oldest')}>
                <option value="newest">newest</option>
                <option value="oldest">oldest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search meta */}
        {search ? (
          <div className="mb-4 text-center text-muted-foreground text-sm">
            Found {sortedFilteredBlogs.length} post{sortedFilteredBlogs.length === 1 ? '' : 's'} for "{search}"
          </div>
        ) : null}

        {/* Posts top-to-bottom */}
        <div className="mx-auto max-w-3xl space-y-6">
          {sortedFilteredBlogs.map((blog) => (
            <BlogPostListItem key={blog.id} blog={blog} />
          ))}
          {sortedFilteredBlogs.length === 0 ? (
            <div className="rounded-xl border py-12 text-center text-muted-foreground">
              No posts found. Try a different search.
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t pt-8 text-center text-muted-foreground">
          <p>© 2025 My Blog. Preview build.</p>
        </footer>
      </div>
    </div>
  );
}
