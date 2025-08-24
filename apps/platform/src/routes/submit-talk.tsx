import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import type React from 'react';
import { useState } from 'react';
import z from 'zod';
import { Button } from '@/components/ui/button';

const insertTedTalkSchema = z.object({
  email: z.email(),
  title: z.string(),
  description: z.string(),
});

const insertTedTalk = createServerFn({
  method: 'POST',
})
  .validator(insertTedTalkSchema)
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
  const [formData, setFormData] = useState({
    email: '',
    title: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Talk submission:', formData);
    await insertTedTalk({
      data: formData,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4 rounded-2xl border-2 border-green-400 p-6">
                {/* Email input */}
                <div className="rounded-xl border-2 border-green-400">
                  <input
                    className="w-full rounded-xl bg-transparent p-4 font-mono text-green-400 placeholder-green-400/60 focus:outline-none"
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your email"
                    required
                    type="email"
                    value={formData.email}
                  />
                </div>

                {/* Title input */}
                <div className="rounded-xl border-2 border-green-400">
                  <input
                    className="w-full rounded-xl bg-transparent p-4 font-mono text-green-400 placeholder-green-400/60 focus:outline-none"
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="talk title"
                    required
                    type="text"
                    value={formData.title}
                  />
                </div>

                {/* Description textarea */}
                <div className="rounded-xl border-2 border-green-400">
                  <textarea
                    className="w-full resize-none rounded-xl bg-transparent p-4 font-mono text-green-400 placeholder-green-400/60 focus:outline-none"
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="short description"
                    required
                    rows={4}
                    value={formData.description}
                  />
                </div>

                {/* Submit button */}
                <Button
                  className="w-full rounded-xl border-0 bg-purple-600 py-6 font-mono text-base text-white hover:bg-purple-700"
                  type="submit"
                >
                  submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/submit-talk')({
  component: SubmitTalkPage,
});
