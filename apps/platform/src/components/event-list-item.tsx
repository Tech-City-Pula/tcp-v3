import type { schema } from '@repo/backend/schema';
import { RichTextOutput } from '@repo/ui/components/rich-text-output';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { Link } from '@tanstack/react-router';
import { useMemo } from 'react';
import TurndownService from 'turndown';
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
    <Card>
      <CardHeader>
        <CardTitle>
          <Link
            params={{
              eventId: props.event.id,
            }}
            to="/events/$eventId"
          >
            {props.event.title}
          </Link>
        </CardTitle>
        <p>
          {formatDate(dateString)} · {props.event.location}
        </p>
      </CardHeader>
      <CardContent>
        <div>
          <RichTextOutput markdown={markdown} />
        </div>
        <div>
          <Link
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
