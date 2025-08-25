import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth/client';
import { Route } from '@/routes/index';

type Props = {
  user: (typeof authClient.$Infer)['Session']['user'];
};

export function LoggedInPanel({ user }: Props) {
  const navigate = Route.useNavigate();

  return (
    <div className="flex flex-col items-start gap-4">
      <h1>Welcome back, {user?.name ?? 'friend'}</h1>
      <Button
        type="button"
        onClick={async () => {
          await authClient.signOut();
          await navigate({ to: '/' });
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
