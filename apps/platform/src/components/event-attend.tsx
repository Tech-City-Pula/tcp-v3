import { useState } from 'react';

interface EventAttendProps {
  eventId: string;
  onSuccess?: () => void;
}

export default function EventAttend({ eventId, onSuccess }: EventAttendProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError(null);
    console.log('handleSubmit called', { email, eventId });
    try {
      // Call the event attendance API route (must be implemented server-side)
      const res = await fetch('/api/event-attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, eventId }),
      });
      if (!res.ok) {
        let errorMsg = 'Failed to register';
        try {
          const data = await res.json();
          errorMsg = data.error || errorMsg;
        } catch {
          throw new Error(errorMsg);
        }
      }
      setStatus('success');
      setEmail('');
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setStatus('error');
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-8 pb-16 text-center">
      <form className="mx-auto max-w-md space-y-4" onSubmit={handleSubmit}>
        <label className="block text-left font-mono text-emerald-400" htmlFor="email">
          Register your email to attend this event:
        </label>
        <input
          autoComplete="email"
          className="w-full rounded border border-emerald-500 bg-black p-3 text-emerald-200 focus:border-emerald-400 focus:outline-none"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          type="email"
          value={email}
        />
        <button
          className="w-full rounded border-2 border-emerald-500 bg-black px-8 py-3 font-bold font-mono text-emerald-500 text-lg transition-all duration-300 hover:bg-emerald-500 hover:text-black disabled:opacity-60"
          disabled={status === 'loading'}
          type="submit"
        >
          {status === 'loading' ? 'Registering…' : '[+] REGISTER_FOR_EVENT'}
        </button>
        {status === 'success' && <div className="mt-2 font-mono text-emerald-400">Successfully registered!</div>}
        {status === 'error' && <div className="mt-2 font-mono text-red-400">{error}</div>}
      </form>
    </section>
  );
}

// interface koji definira koje propove prima komponenta
// handleSubmit napravit
// u event detail stranici importat i koristit komponentu
