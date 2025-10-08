import { Button } from '@repo/ui/components/shadcn/button';
import { toast } from '@repo/ui/components/shadcn/sonner';
import { useForm } from '@tanstack/react-form';
import { type FormEventHandler, useCallback } from 'react';
import { ZodError } from 'zod';
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
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <form.Field
          name="email"
          validators={{
            onChange: emailSchema,
          }}
        >
          {(field) => (
            <div>
              <input
                id={field.name}
                type="email"
                autoComplete="email"
                placeholder="your email"
                required
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <div>
                  <em>
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
            <div>
              <input
                id={field.name}
                type="text"
                placeholder="talk title"
                required
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <div>
                  <em>
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
            <div>
              <textarea
                id={field.name}
                placeholder="short description"
                required
                rows={4}
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <div>
                  <em>
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
