import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { Link } from '@tanstack/react-router';
import { Calendar, FileText, User } from 'lucide-react';
import { formatDate, getWordCount, type Post } from '@/lib/posts';

export function PostCard({ post }: { post: Post }) {
  const words = getWordCount(post.content);

  return (
    <Card className="rounded-xl transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="mb-2 flex items-center gap-2 text-muted-foreground text-sm">
          <Calendar className="h-12 w-12" />
          <span>{formatDate(post.date)}</span>
          <User className="ml-2 h-4 w-4" />
          <span>{post.author}</span>
          <FileText className="ml-2 h-4 w-4" />
          <span>{words} words</span>
        </div>
        <CardTitle className="text-red-400 transition-colors hover:text-primary">
          <Link
            params={{
              slug: post.slug,
            }}
            to="/blog/$slug"
          >
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{post.excerpt}</p>
        <div className="mt-4">
          <Link
            className="font-medium text-primary text-sm hover:underline"
            params={{
              slug: post.slug,
            }}
            to="/blog/$slug"
          >
            Read more →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
