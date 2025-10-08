import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { SubmitTalkForm } from '@/components/submit-talk-form';
import { type SubmitTalkInput, submitTalkSchema } from '@/lib/validation';

const insertTedTalk = createServerFn({
  method: 'POST',
})
  .validator(submitTalkSchema)
  .handler(async ({ data }) => {
    try {
      await db.insert(schema.talks).values(data);

      return {
        success: true,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
      };
    }
  });

function SubmitTalkPage() {
  const handleSubmit = async (data: SubmitTalkInput) => {
    return await insertTedTalk({ data });
  };

  return (
    <div>
      <div>
        {/* Terminal header */}
        <div>
          <h1>/submit-talk</h1>
        </div>

        <div>
          {/* Form */}
          <div>
            <div>
              <h2>do you have an interesting idea</h2>
              <h2>you'd like to present?</h2>
              <p>let us know and we'll make it happen</p>
            </div>

            <SubmitTalkForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/submit-talk')({
  component: SubmitTalkPage,
});
