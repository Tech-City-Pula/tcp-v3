import { createFileRoute } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { PostCard } from '@/components/post-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type SortOption, searchPosts, sortPosts } from '@/lib/posts';
export const Route = createFileRoute('/blogs')({
  component: RouteComponent,
});

function RouteComponent() {
  return <BlogPage />;
}

function BlogPage() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortOption>('newest'); // default newest -> oldest

  const filteredAndSorted = useMemo(() => {
    const filtered = searchPosts(query);
    return sortPosts(filtered, sort);
  }, [query, sort]);

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
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blog posts..."
                value={query}
              />
            </div>
            <div className="w-full sm:w-64">
              <Select onValueChange={(v) => setSort(v as SortOption)} value={sort}>
                <SelectTrigger aria-label="Sort posts" className="rounded-xl">
                  <SelectValue placeholder="Sort posts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest to oldest</SelectItem>
                  <SelectItem value="oldest">Oldest to newest</SelectItem>
                  <SelectItem value="most-words">Most words to least</SelectItem>
                  <SelectItem value="least-words">Least words to most</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Search meta */}
        {query ? (
          <div className="mb-4 text-center text-muted-foreground text-sm">
            Found {filteredAndSorted.length} post{filteredAndSorted.length === 1 ? '' : 's'} for "{query}"
          </div>
        ) : null}

        {/* Posts top-to-bottom */}
        <div className="mx-auto max-w-3xl space-y-6">
          {filteredAndSorted.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {filteredAndSorted.length === 0 ? (
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
