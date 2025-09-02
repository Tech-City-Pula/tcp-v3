import { createFileRoute, redirect } from '@tanstack/react-router';
import BlogForm from '@/components/forms/blogs-form';
import { getInitialSession } from '@/server/session';

export default function BlogsRoute() {
  return <BlogForm />;
}

export const Route = createFileRoute('/blogs')({
  component: BlogsRoute,
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
