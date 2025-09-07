import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginForm } from '@/components/auth/login-form';
import { getInitialSession } from '@/server/session';

function LoginRoute() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}

export const Route = createFileRoute('/login')({
  component: LoginRoute,
  beforeLoad: async () => {
    const sessionData = await getInitialSession();

    if (sessionData.user) {
      throw redirect({ to: '/' });
    }
  },
});
