import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface NewsletterProps extends React.HTMLAttributes<HTMLFormElement> {
  onSubscribe?: (email: string) => void | Promise<void>
  placeholder?: string
  buttonLabel?: string
}

export default function Newsletter({
  className,
  onSubscribe,
  placeholder = 'Enter your email',
  buttonLabel = 'SUBSCRIBE',
  ...props
}: NewsletterProps) {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)

  function isValidEmail(value: string) {
    // Basic email pattern; keep it lightweight
    return /.+@.+\..+/.test(value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
      setSubmitting(true)
      if (onSubscribe) await onSubscribe(email)
      else console.log('[newsletter] subscribe:', email)
      // Optionally clear the field on success
      setEmail('')
    } catch (err) {
      setError('Subscription failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)} {...props}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'newsletter-email-error' : undefined}
            className="h-11 rounded-md"
            required
          />
          {error ? (
            <p id="newsletter-email-error" className="mt-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}
        </div>
        <Button type="submit" className="h-11 px-6 font-semibold uppercase tracking-wide" disabled={submitting}>
          {submitting ? 'SUBMITTING…' : buttonLabel}
        </Button>
      </div>
    </form>
  )
}