import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, User } from 'lucide-react'
import { type Post } from "@/lib/posts"
import { formatDate, getWordCount } from "@/lib/posts"

export function PostCard({ post }: { post: Post }) {
  const words = getWordCount(post.content)

  return (
    <Card className="rounded-xl hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(post.date)}</span>
          <User className="h-4 w-4 ml-2" />
          <span>{post.author}</span>
          <FileText className="h-4 w-4 ml-2" />
          <span>{words} words</span>
        </div>
        <CardTitle className="hover:text-primary transition-colors">
          <Link to='/blog/$slug' params={{
            slug: post.slug
          }}>{post.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{post.excerpt}</p>
        <div className="mt-4">
          <Link to='/blog/$slug' params={{
            slug: post.slug
          }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Read more →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
