import { Button } from '@/components/ui/button'
import { formatDate, getPostBySlug, getWordCount } from '@/lib/posts'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Calendar, FileText, User } from 'lucide-react'

export const Route = createFileRoute('/blog/$slug')({
  component: RouteComponent,
})

interface BlogPostPageProperties { params: { slug: string } }

function RouteComponent() {
  const { slug } = Route.useParams()

  return <BlogPostPage params={{
    slug: slug 
  }}/>}

function BlogPostPage({ params }: BlogPostPageProperties) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    // Rely on the app/not-found.tsx route
    throw new Error("Not found")
  }

  const wordCount = getWordCount(post.content)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button asChild variant="ghost" className="mb-6 rounded-xl">
          <Link to="/blogs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        <article>
          <header className="mb-6">
            <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
            <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-3">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.date)}</span>
              <User className="h-4 w-4 ml-2" />
              <span>{post.author}</span>
              <FileText className="h-4 w-4 ml-2" />
              <span>{wordCount} words</span>
            </div>
            {post.excerpt ? (
              <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
            ) : null}
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}