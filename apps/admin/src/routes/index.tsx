import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoggedInPanel } from '@/components/auth/logged-in-panel';
import { getInitialSession } from '@/server/session';

function Home() {
  const loaderData = Route.useLoaderData();
  const user = loaderData.user;

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gray-300">
      {user ? <LoggedInPanel user={user} /> : null}
    </div>
  );
}

function IndexRouteComponent() {
  return <Home />;
}

export const Route = createFileRoute('/')({
  component: IndexRouteComponent,
  beforeLoad: async () => {
    try {
      const sessionData = await getInitialSession();
      if (!sessionData.user) {
        throw redirect({ to: '/login' });
      }
      return sessionData;
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
});
