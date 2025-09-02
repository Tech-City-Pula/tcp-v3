import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { addMonths, addYears } from 'date-fns';
import { z } from 'zod';
import MemberForm from '@/components/forms/member-form';
import { emailSchema } from '@/lib/validation/auth';
import { membershipTypeSchema, nameSchema } from '@/lib/validation/members';
import { getInitialSession } from '@/server/session';

export const insertNewMemberSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  membershipType: membershipTypeSchema,
  email: emailSchema,
});

export const insertNewMember = createServerFn({
  method: 'POST',
})
  .validator(insertNewMemberSchema)
  .handler(async ({ data }) => {
    const now = new Date();
    const isMonthly = data.membershipType === 'monthly';
    const expiresAt = isMonthly ? addMonths(now, 1) : addYears(now, 1);

    await db.insert(schema.members).values({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      membershipType: data.membershipType,
      expiresAt,
    });
    return { success: true };
  });

export const Route = createFileRoute('/members')({
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
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <MemberForm />
    </div>
  );
}
