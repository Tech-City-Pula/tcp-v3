import { createFileRoute, redirect } from '@tanstack/react-router';
import { EventForm } from '@/components/forms/event-form';
import { getInitialSession } from '@/server/session';

function EventsRoute() {
  return <EventForm />;
}

export const Route = createFileRoute('/events')({
  component: EventsRoute,
  beforeLoad: async () => {
    try {
      const sessionData = await getInitialSession();

      // If no session, redirect to login
      if (!sessionData.user) {
        throw redirect({
          to: '/',
        });
      }

      return sessionData;
    } catch (error) {
      // If error (like non-admin role), redirect to login
      if (error instanceof Error && error.message.includes('Admin role required')) {
        throw redirect({
          to: '/',
        });
      }
      throw error;
    }
  },
  loader(ctx) {
    return ctx.context;
  },
});
