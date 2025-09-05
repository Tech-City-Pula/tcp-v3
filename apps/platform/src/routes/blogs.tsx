import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { Navbar } from '@/components/navbar';
import { BlogsTable } from '@/components/table/blogs-table';

const getAllBlogs = createServerFn().handler(async () => {
  return await db.select().from(schema.blogs);
});

export const Route = createFileRoute('/blogs')({
  component: RouteComponent,
  loader() {
    return getAllBlogs();
  },
});

function RouteComponent() {
  return <BlogPage />;
}

function BlogPage() {
  const allBlogs = Route.useLoaderData();
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        <header>
          <h1 className="font-semibold text-2xl">Blogs</h1>
        </header>
        <BlogsTable data={allBlogs} />
      </main>
    </div>
  );
}
