import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { createServerFn } from '@tanstack/react-start';
import { createBlogEndpointSchema } from '@/lib/validation/blogs';

export const createBlog = createServerFn({
  method: 'POST',
})
  .validator(createBlogEndpointSchema)
  .handler(async ({ data }) => {
    await db.insert(schema.blogs).values({
      title: data.title,
      content: data.content,
    });

    return { success: true };
  });
