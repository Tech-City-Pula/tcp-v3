import { createFileRoute } from '@tanstack/react-router';
import { LoggedInPanel } from '@/components/auth/logged-in-panel';
import { LoginForm } from '@/components/auth/login-form';
import { authClient } from '@/lib/auth/client';
import { getInitialSession } from '@/server/session';

function Home() {
  const loaderData = Route.useLoaderData();
  const session = authClient.useSession();

  const user = loaderData.user ?? session.data?.user;

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gray-300">
      {user ? <LoggedInPanel user={user} /> : <LoginForm />}
    </div>
  );
}

function IndexRouteComponent() {
  return <Home />;
}

export const Route = createFileRoute('/')({
  component: IndexRouteComponent,
  beforeLoad() {
    return getInitialSession();
  },
  loader(ctx) {
    return ctx.context;
  },
});
