import { render, toPlainText } from '@react-email/components';
import { sendEmail } from '@repo/backend/email';
import { ContactEmail } from '@repo/backend/emails/contact-email';
import { cn } from '@repo/ui/utils';
import { useForm } from '@tanstack/react-form';
import { createServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { z } from 'zod';

const MIN_EMAIL_LENGTH = 3;
const MAX_EMAIL_LENGTH = 50;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 500;

type ContactFormProps = {
  onSuccess: (values: ContactFormValues) => void;
  emailPlaceholder?: string;
  messagePlaceholder?: string;
  submitButtonText?: string;
  className?: string;
  showCharacterCount?: boolean;
};

export const contactSchema = z.object({
  email: z
    .string()
    .min(MIN_EMAIL_LENGTH, 'Email must be at least 3 characters')
    .max(MAX_EMAIL_LENGTH, 'Email must be at most 50 characters')
    .email('Invalid email address'),
  message: z
    .string()
    .min(MIN_MESSAGE_LENGTH, 'Message must be at least 10 characters')
    .max(MAX_MESSAGE_LENGTH, 'Message must be at most 500 characters'),
});

export function ContactForm({
  onSuccess,
  emailPlaceholder = 'your@email.com',
  messagePlaceholder = 'Type your message here...',
  submitButtonText = '$ send --message',
  className = '',
  showCharacterCount = true,
}: ContactFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      try {
        setServerError(null);
        await sendContact({
          data: value,
        });
      } catch (error) {
        setServerError(error instanceof Error ? error.message : 'An error occurred');
      }
    },
    validators: {
      // Use Zod schema directly - TanStack Form supports Standard Schema
      onChange: contactSchema,
    },
  });

  return (
    <div className={className}>
      <form
        onSubmit={form.handleSubmit}
        noValidate
        aria-describedby={serverError ? 'server-error' : undefined}
      >
        <form.Field
          name="email"
          children={(field) => (
            <div>
              <label htmlFor={field.name}>
                $ echo "your-email" {'>'} contact.txt
              </label>
              <input
                id={field.name}
                type="email"
                placeholder={emailPlaceholder}
                required
                aria-invalid={!!field.state.meta.errors.length}
                aria-describedby={field.state.meta.errors.length ? `${field.name}-error` : undefined}
              />
              {field.state.meta.errors.length > 0 && (
                <div
                  className={cn(
                    field.state.meta.errors.length === 0 && 'invisible'
                  )}
                >
                  {field.state.meta.errors.map((err, index) => (
                    <div key={index}>{err?.message}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        />

        <form.Field
          name="message"
          children={(field) => (
            <div>
              <label htmlFor={field.name}>
                $ vim message.txt
              </label>
              <textarea
                id={field.name}
                placeholder={messagePlaceholder}
                required
                aria-invalid={!!field.state.meta.errors.length}
                aria-describedby={field.state.meta.errors.length ? `${field.name}-error` : undefined}
              />
              {showCharacterCount && (
                <div>{form.state.values.message.length}/500 chars</div>
              )}
              <div
                className={cn(
                  field.state.meta.errors.length === 0 && 'invisible'
                )}
              >
                {field.state.meta.errors.map((err) => (
                  <div key={err?.message}>{err?.message}</div>
                ))}
              </div>
            </div>
          )}
        />

        <button
          type="submit"
          disabled={form.state.isSubmitting}
        >
          {form.state.isSubmitting ? '$ sending...' : submitButtonText}
        </button>

        {serverError && (
          <div id="server-error" role="alert">
            {serverError}
          </div>
        )}
      </form>
    </div>
  );
}

const maxLength = 500;
export const sendContact = createServerFn({ method: 'POST' })
  .validator(z.object({ email: z.email(), message: z.string().min(1).max(maxLength) }))
  .handler(async ({ data }) => {
    const emailHtml = await render(<ContactEmail>{data.message}</ContactEmail>);

    const info = await sendEmail({
      subject: 'test mail',
      to: data.email,
      html: emailHtml,
      text: toPlainText(emailHtml),
    });

    return { ok: true, id: info.messageId };
  });

export type ContactFormValues = z.infer<typeof contactSchema>;
