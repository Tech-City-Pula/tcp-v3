import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from 'lucide-react'
import { posts, searchPosts, sortPosts, type SortOption } from "@/lib/posts"
import { PostCard } from "@/components/post-card"
import { Navbar } from "@/components/navbar"
export const Route = createFileRoute('/blogs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BlogPage/>
}


function BlogPage() {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortOption>("newest") // default newest -> oldest

  const filteredAndSorted = useMemo(() => {
    const filtered = searchPosts(query)
    return sortPosts(filtered, sort)
  }, [query, sort])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">My Blog</h1>
          <p className="text-muted-foreground text-lg">
            Insights and tutorials on web development and technology.
          </p>
        </div>

        {/* Search + Sort */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blog posts..."
                className="pl-10 rounded-xl"
                aria-label="Search blog posts"
              />
            </div>
            <div className="w-full sm:w-64">
              <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                <SelectTrigger className="rounded-xl" aria-label="Sort posts">
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
          <div className="text-center text-sm text-muted-foreground mb-4">
            Found {filteredAndSorted.length} post{filteredAndSorted.length === 1 ? "" : "s"} for "{query}"
          </div>
        ) : null}

        {/* Posts top-to-bottom */}
        <div className="max-w-3xl mx-auto space-y-6">
          {filteredAndSorted.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {filteredAndSorted.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 border rounded-xl">
              No posts found. Try a different search.
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-muted-foreground">
          <p>© 2025 My Blog. Preview build.</p>
        </footer>
      </div>
    </div>
  )
}
