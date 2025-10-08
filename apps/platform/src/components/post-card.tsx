import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { Link } from '@tanstack/react-router';
import { Calendar, FileText, User } from 'lucide-react';
import { formatDate, getWordCount, type Post } from '@/lib/posts';

export function PostCard({ post }: { post: Post }) {
  const words = getWordCount(post.content);

  return (
    <Card>
      <CardHeader>
        <div>
          <Calendar />
          <span>{formatDate(post.date)}</span>
          <User />
          <span>{post.author}</span>
          <FileText />
          <span>{words} words</span>
        </div>
        <CardTitle>
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
        <p>{post.excerpt}</p>
        <div>
          <Link
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
