import type { schema } from '@repo/backend/schema';
import { Link } from '@tanstack/react-router';
import { RichTextOutput } from '@/components/rich-text-output';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/posts';

type BlogPostListItemProps = {
  blog: typeof schema.blogs.$inferSelect;
};

export function BlogPostListItem(props: BlogPostListItemProps) {
  return (
    <Card className="rounded-xl transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-primary">
          <Link
            params={{
              slug: props.blog.id,
            }}
            to="/blog/$slug"
          >
            {props.blog.title}
          </Link>
        </CardTitle>
        <p className="font-light text-primary/75 text-xs">{formatDate(props.blog.createdAt.toISOString())}</p>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 h-full text-muted-foreground">
          <RichTextOutput markdown={props.blog.content} />
        </p>
        <div className="mt-4">
          <Link
            className="font-medium text-primary text-sm hover:underline"
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
