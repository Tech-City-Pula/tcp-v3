import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { Newsletter } from '@/components/newsletter';

const subscribeToNewletter = createServerFn({
  method: 'POST',
})
  .validator(
    z.object({
      email: z.email(),
    })
  )
  .handler(async ({ data }) => {
    await db.insert(schema.newsletterSubscriptions).values({
      email: data.email,
    });
  });
export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-xl p-6">
      <Newsletter
        onSubscribe={async (email) => {
          await subscribeToNewletter({
            data: {
              email,
            },
          });
        }}
      />
    </div>
  );
}
