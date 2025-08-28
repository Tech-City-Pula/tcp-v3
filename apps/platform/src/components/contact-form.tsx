import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const MIN_EMAIL_LENGTH = 3;
const MAX_EMAIL_LENGTH = 50;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 500;

type ContactFormProps = {
  onSuccess?: (values: ContactFormValues) => void;
  emailPlaceholder?: string;
  messagePlaceholder?: string;
  submitButtonText?: string;
  className?: string;
  showCharacterCount?: boolean;
};

export function ContactForm({
  onSuccess,
  emailPlaceholder = 'your@email.com',
  messagePlaceholder = 'Type your message here...',
  submitButtonText = '$ send --message',
  className = '',
  showCharacterCount = true,
}: ContactFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    defaultValues: {
      email: '',
      message: '',
    },
    validatorAdapter: zodValidator,
    validator: contactSchema,
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        // Replace with your real API call
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
        });

        if (!response.ok) {
          const errorData = await response.json();

          // Handle specific server errors
          if (response.status === 409) {
            setServerError('This email is already registered for event attendance.');
            toast({
              title: 'Error',
              description: 'This email is already registered for event attendance.',
              variant: 'destructive',
            });
            return;
          }

          if (response.status === 400) {
            setServerError(errorData.message || 'Invalid form data. Please check your inputs.');
            toast({
              title: 'Validation Error',
              description: errorData.message || 'Invalid form data. Please check your inputs.',
              variant: 'destructive',
            });
            return;
          }

          throw new Error(errorData.message || 'Server error');
        }

        // Success
        toast({
          title: 'Success!',
          description: 'Your message has been sent.',
          variant: 'success',
        });

        // Reset form
        form.reset();

        // Call onSuccess callback if provided
        onSuccess?.(value);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown server error. Please try again.';
        setServerError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    },
  });

  return (
    <div className={`rounded-lg border border-green-400 bg-gray-900 p-6 ${className}`}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit}
        noValidate
        aria-describedby={serverError ? 'server-error' : undefined}
      >
        <form.Field
          name="email"
          children={(field) => (
            <div>
              <label className="mb-2 block text-green-300 text-sm" htmlFor={field.name}>
                $ echo "your-email" {'>'} contact.txt
              </label>
              <input
                id={field.name}
                className="w-full rounded border border-green-400 bg-black p-2 font-mono text-green-400 placeholder-green-600 focus:border-green-300 focus:outline-none focus:ring-1 focus:ring-green-300"
                type="email"
                placeholder={emailPlaceholder}
                required
                {...field.getInputProps()}
                aria-invalid={!!field.state.meta.errors.length}
                aria-describedby={field.state.meta.errors.length ? `${field.name}-error` : undefined}
              />
              {field.state.meta.errors.length > 0 && (
                <div id={`${field.name}-error`} className="mt-1 text-red-400 text-xs" role="alert">
                  {field.state.meta.errors[0]}
                </div>
              )}
            </div>
          )}
        />

        <form.Field
          name="message"
          children={(field) => (
            <div>
              <label className="mb-2 block text-green-300 text-sm" htmlFor={field.name}>
                $ vim message.txt
              </label>
              <textarea
                id={field.name}
                className="min-h-[100px] w-full rounded border border-green-400 bg-black p-2 font-mono text-green-400 placeholder-green-600 focus:border-green-300 focus:outline-none focus:ring-1 focus:ring-green-300"
                placeholder={messagePlaceholder}
                required
                {...field.getInputProps()}
                aria-invalid={!!field.state.meta.errors.length}
                aria-describedby={field.state.meta.errors.length ? `${field.name}-error` : undefined}
              />
              {showCharacterCount && (
                <div className="mt-1 text-green-600 text-xs">{form.state.values.message.length}/500 chars</div>
              )}
              {field.state.meta.errors.length > 0 && (
                <div id={`${field.name}-error`} className="mt-1 text-red-400 text-xs" role="alert">
                  {field.state.meta.errors[0]}
                </div>
              )}
            </div>
          )}
        />

        <button
          className="w-full rounded bg-green-400 p-2 font-bold font-mono text-black transition-colors hover:bg-green-300 disabled:cursor-not-allowed disabled:bg-green-600"
          type="submit"
          disabled={form.state.isSubmitting}
        >
          {form.state.isSubmitting ? '$ sending...' : submitButtonText}
        </button>

        {serverError && (
          <div id="server-error" className="mt-2 text-red-400 text-xs" role="alert">
            {serverError}
          </div>
        )}
      </form>
    </div>
  );
}
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

export type ContactFormValues = z.infer<typeof contactSchema>;
