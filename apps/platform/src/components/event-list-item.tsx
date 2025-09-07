import type { schema } from '@repo/backend/schema';
import { Link } from '@tanstack/react-router';
import { useMemo } from 'react';
import TurndownService from 'turndown';
import { RichTextOutput } from '@/components/rich-text-output';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/posts';

type EventListItemProps = {
  event: typeof schema.events.$inferSelect;
};

export function EventListItem(props: EventListItemProps) {
  const td = useMemo(() => new TurndownService(), []);
  const markdown = useMemo(() => {
    try {
      return td.turndown(props.event.description);
    } catch {
      return props.event.description;
    }
  }, [props.event.description, td]);

  const dateString = typeof props.event.eventAt === 'string' ? props.event.eventAt : props.event.eventAt.toISOString();
  return (
    <Card className="rounded-xl transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-primary">
          <Link
            params={{
              eventId: props.event.id,
            }}
            to="/events/$eventId"
          >
            {props.event.title}
          </Link>
        </CardTitle>
        <p className="font-light text-primary/75 text-xs">
          {formatDate(dateString)} · {props.event.location}
        </p>
      </CardHeader>
      <CardContent>
        <div className="line-clamp-2 h-full text-muted-foreground">
          <RichTextOutput markdown={markdown} />
        </div>
        <div className="mt-4">
          <Link
            className="font-medium text-primary text-sm hover:underline"
            params={{
              eventId: props.event.id,
            }}
            to="/events/$eventId"
          >
            Read more →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
