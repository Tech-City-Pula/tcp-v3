import type { schema } from '@repo/backend/schema';
import { RichTextOutput } from '@repo/ui/components/rich-text-output';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { Link } from '@tanstack/react-router';
import { formatDate } from '@/lib/posts';

type BlogPostListItemProps = {
  blog: typeof schema.blogs.$inferSelect;
};

export function BlogPostListItem(props: BlogPostListItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link
            params={{
              slug: props.blog.id,
            }}
            to="/blog/$slug"
          >
            {props.blog.title}
          </Link>
        </CardTitle>
        <p>{formatDate(props.blog.createdAt.toISOString())}</p>
      </CardHeader>
      <CardContent>
        <div>
          <RichTextOutput markdown={props.blog.content} />
        </div>
        <div>
          <Link
            params={{
              slug: props.blog.id,
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
