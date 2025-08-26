import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useState } from 'react';
import { toast } from '@/components/ui/toast';
import { type ContactFormValues, contactSchema } from '@/schemas/contact';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

function ContactPage() {
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
        if (value.email === 'hello@techcitypula.org') {
          setServerError('This email is already registered for event attendance.');
          toast({
            title: 'Error',
            description: 'This email is already registered for event attendance.',
            variant: 'destructive',
          });
          return;
        }
        // Success: show toast or success message here
        toast({
          title: 'Success!',
          description: 'Your message has been sent.',
          variant: 'success',
        });
      } catch {
        setServerError('Unknown server error. Please try again.');
        toast({
          title: 'Error',
          description: 'Unknown server error. Please try again.',
          variant: 'destructive',
        });
      }
    },
  });

  return (
    <div className="min-h-screen bg-black p-4 font-mono text-green-400 md:p-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <div className="mb-2 text-sm opacity-70">~/contact</div>
          <h1 className="font-bold text-2xl md:text-3xl">$ cat contact.md</h1>
        </header>
        <section className="mb-8">
          <h3 className="mb-4 text-green-300 text-lg">{'> contact --get-in-touch'}</h3>
          <div className="rounded-lg border border-green-400 bg-gray-900 p-6">
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
                      className="w-full rounded border border-green-400 bg-black p-2 font-mono text-green-400 placeholder-green-600"
                      type="email"
                      placeholder="your@email.com"
                      required
                      {...field.getInputProps()}
                      aria-invalid={!!field.state.meta.errors.length}
                      aria-describedby={field.state.meta.errors.length ? `${field.name}-error` : undefined}
                      maxLength={50}
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
                      className="min-h-[100px] w-full rounded border border-green-400 bg-black p-2 font-mono text-green-400 placeholder-green-600"
                      placeholder="Type your message here..."
                      required
                      {...field.getInputProps()}
                      aria-invalid={!!field.state.meta.errors.length}
                      aria-describedby={field.state.meta.errors.length ? `${field.name}-error` : undefined}
                      maxLength={500}
                    />
                    <div className="mt-1 text-green-600 text-xs">{form.state.values.message.length}/500 chars</div>
                    {field.state.meta.errors.length > 0 && (
                      <div id={`${field.name}-error`} className="mt-1 text-red-400 text-xs" role="alert">
                        {field.state.meta.errors[0]}
                      </div>
                    )}
                  </div>
                )}
              />

              <button
                className="w-full rounded bg-green-400 p-2 font-bold font-mono text-black transition-colors hover:bg-green-300"
                type="submit"
                disabled={form.state.isSubmitting}
              >
                $ send --message
              </button>
              {serverError && (
                <div id="server-error" className="mt-2 text-red-400 text-xs" role="alert">
                  {serverError}
                </div>
              )}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
