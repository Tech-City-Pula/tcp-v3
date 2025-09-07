import { createFileRoute, redirect } from '@tanstack/react-router';
import { BlogForm } from '@/components/forms/blog-form';
import { getInitialSession } from '@/server/session';

function BlogsRoute() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <BlogForm />
    </div>
  );
}

export const Route = createFileRoute('/blogs')({
  component: BlogsRoute,
  beforeLoad: async () => {
    try {
      const sessionData = await getInitialSession();

      // If no session, redirect to login
      if (!sessionData.user) {
        throw redirect({
          to: '/login',
        });
      }

      return sessionData;
    } catch (error) {
      // If error (like non-admin role), redirect to login
      if (error instanceof Error && error.message.includes('Admin role required')) {
        throw redirect({
          to: '/login',
        });
      }
      throw error;
    }
  },
  loader(ctx) {
    return ctx.context;
  },
});
