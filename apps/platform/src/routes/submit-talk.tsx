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
    <div className="min-h-screen bg-black p-8 font-mono text-green-400">
      <div className="mx-auto max-w-4xl">
        {/* Terminal header */}
        <div className="mb-8">
          <h1 className="mb-4 text-xl">/submit-talk</h1>
        </div>

        <div className="mx-auto max-w-2xl">
          {/* Form */}
          <div className="rounded-3xl border-2 border-green-400 p-8">
            <div className="mb-8">
              <h2 className="mb-2 text-lg">do you have an interesting idea</h2>
              <h2 className="mb-6 text-lg">you'd like to present?</h2>
              <p className="text-sm opacity-80">let us know and we'll make it happen</p>
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
