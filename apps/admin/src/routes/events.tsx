import { createFileRoute } from '@tanstack/react-router';
import EventForm from '@/components/forms/event-form';
import { getInitialSession } from '@/server/session';

export default function EventsRoute() {
  return <EventForm />;
}

export const Route = createFileRoute('/events')({
  component: EventsRoute,
  beforeLoad() {
    return getInitialSession();
  },
  loader(ctx) {
    return ctx.context;
  },
});
