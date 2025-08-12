import { type FormEvent, type HTMLAttributes, useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface NewsletterProps extends HTMLAttributes<HTMLFormElement> {
  onSubscribe?: (email: string) => void | Promise<void>;
  placeholder?: string;
  buttonLabel?: string;
}

const emailSchema = z.email();

export default function Newsletter({
  className,
  onSubscribe,
  placeholder = 'Enter your email',
  buttonLabel = 'SUBSCRIBE',
  ...props
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!emailSchema.parse(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setSubmitting(true);
      if (onSubscribe) {
        await onSubscribe(email);
      }
      // Optionally clear the field on success
      setEmail('');
    } catch (_err) {
      setError('Subscription failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={cn('w-full', className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <Input
            aria-describedby={error ? 'newsletter-email-error' : undefined}
            aria-invalid={error ? 'true' : 'false'}
            className="h-11 rounded-md"
            id="newsletter-email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            type="email"
            value={email}
          />
          {error ? (
            <p className="mt-2 text-destructive text-sm" id="newsletter-email-error">
              {error}
            </p>
          ) : null}
        </div>
        <Button className="h-11 px-6 font-semibold uppercase tracking-wide" disabled={submitting} type="submit">
          {submitting ? 'SUBMITTING…' : buttonLabel}
        </Button>
      </div>
    </form>
  );
}
