import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoggedInPanel } from '@/components/auth/logged-in-panel';
import { getInitialSession } from '@/server/session';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    try {
      const sessionData = await getInitialSession();
      if (!sessionData.user) {
        throw redirect({ to: '/login' });
      }
      return sessionData.user;
    } catch (error) {
      if (error instanceof Error && error.message.includes('Admin role required')) {
        throw redirect({ to: '/login' });
      }
      throw error;
    }
  },
  loader(ctx) {
    return ctx.context;
  },
  component: Home,
});

function Home() {
  const user = Route.useLoaderData();

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gray-300">
      <LoggedInPanel user={user} />
    </div>
  );
}
