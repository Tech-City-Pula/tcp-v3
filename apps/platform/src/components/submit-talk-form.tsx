import { useForm } from '@tanstack/react-form';
import { type FormEventHandler, useCallback } from 'react';
import { toast } from 'sonner';
import { ZodError } from 'zod';
import { Button } from '@/components/ui/button';
import { descriptionSchema, emailSchema, type SubmitTalkInput, submitTalkSchema, titleSchema } from '@/lib/validation';

const defaultTalkInfo: SubmitTalkInput = {
  email: '',
  title: '',
  description: '',
} as const;

type SubmitTalkFormProps = {
  onSubmit: (data: SubmitTalkInput) => Promise<{ success: boolean }>;
};

export function SubmitTalkForm({ onSubmit }: SubmitTalkFormProps) {
  const form = useForm({
    defaultValues: defaultTalkInfo,
    validators: {
      onSubmit: submitTalkSchema,
    },
    async onSubmit(props) {
      try {
        const response = await onSubmit(props.value);

        if (response.success) {
          toast.success('Talk submitted successfully!');
          form.reset();
        } else {
          throw new Error('Failed to submit talk');
        }
      } catch (error) {
        if (error instanceof Error || error instanceof ZodError) {
          toast.error(error.message);
        } else {
          console.error(error);
          toast.error('An unexpected error occurred');
        }
      }
    },
  });

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();
      await form.handleSubmit();
    },
    [form.handleSubmit]
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="space-y-4 rounded-2xl border-2 border-green-400 p-6">
        <form.Field
          name="email"
          validators={{
            onChange: emailSchema,
          }}
        >
          {(field) => (
            <div className="rounded-xl border-2 border-green-400">
              <input
                id={field.name}
                type="email"
                autoComplete="email"
                className="w-full rounded-xl bg-transparent p-4 font-mono text-green-400 placeholder-green-400/60 focus:outline-none"
                placeholder="your email"
                required
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <div className="px-4 pb-2">
                  <em className="text-red-400 text-xs">
                    {field.state.meta.errors.map((err) => err?.message).join(', ')}
                  </em>
                </div>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="title"
          validators={{
            onChange: titleSchema,
          }}
        >
          {(field) => (
            <div className="rounded-xl border-2 border-green-400">
              <input
                id={field.name}
                type="text"
                className="w-full rounded-xl bg-transparent p-4 font-mono text-green-400 placeholder-green-400/60 focus:outline-none"
                placeholder="talk title"
                required
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <div className="px-4 pb-2">
                  <em className="text-red-400 text-xs">
                    {field.state.meta.errors.map((err) => err?.message).join(', ')}
                  </em>
                </div>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="description"
          validators={{
            onChange: descriptionSchema,
          }}
        >
          {(field) => (
            <div className="rounded-xl border-2 border-green-400">
              <textarea
                id={field.name}
                className="w-full resize-none rounded-xl bg-transparent p-4 font-mono text-green-400 placeholder-green-400/60 focus:outline-none"
                placeholder="short description"
                required
                rows={4}
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <div className="px-4 pb-2">
                  <em className="text-red-400 text-xs">
                    {field.state.meta.errors.map((err) => err?.message).join(', ')}
                  </em>
                </div>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              className="w-full rounded-xl border-0 bg-purple-600 py-6 font-mono text-base text-white hover:bg-purple-700"
              disabled={!canSubmit || isSubmitting || !form.state.isDirty}
            >
              {isSubmitting ? 'submitting...' : 'submit'}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
