import { render, toPlainText } from '@react-email/components';
import { sendEmail } from '@repo/backend/email';
import { ContactEmail } from '@repo/backend/emails/contact-email';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { type FormEvent, useState } from 'react';
import { z } from 'zod';

const emailSchema = z.email();

function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(null);

    if (!emailSchema.parse(email)) {
      setError('Enter a valid email');
      return;
    }
    if (!message.trim()) {
      setError('Message cannot be empty');
      return;
    }

    setSubmitting(true);
    try {
      const res = await sendContact({ data: { email, message } });
      if (res?.ok) {
        setOk('Message sent. Check MailHog.');
        setEmail('');
        setMessage('');
      } else {
        setError('Failed to send. Try again.');
      }
    } catch (_err) {
      setError('Failed to send. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="mx-auto max-w-xl border border-emerald-500/40 bg-black/70 p-6" onSubmit={onSubmit}>
      <h2 className="mb-4 font-mono text-emerald-500 text-xl">
        <span className="text-white">[</span> CONTACT_US <span className="text-white">]</span>
      </h2>
      <div className="mb-3">
        <label className="mb-1 block font-mono text-emerald-400 text-sm" htmlFor="contact-email">
          EMAIL
        </label>
        <input
          className="h-11 w-full border border-emerald-500/40 bg-black px-3 text-emerald-100 outline-none focus:border-emerald-500"
          id="contact-email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={email}
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block font-mono text-emerald-400 text-sm" htmlFor="contact-message">
          MESSAGE
        </label>
        <textarea
          className="min-h-[140px] w-full border border-emerald-500/40 bg-black px-3 py-2 text-emerald-100 outline-none focus:border-emerald-500"
          id="contact-message"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message…"
          required
          value={message}
        />
      </div>
      {error ? <p className="mb-3 font-mono text-red-400 text-sm">{error}</p> : null}
      {ok ? <p className="mb-3 font-mono text-emerald-400 text-sm">{ok}</p> : null}
      <button
        className="cursor-pointer border-2 border-emerald-500 bg-black px-6 py-3 font-bold font-mono text-emerald-500 transition-all duration-300 hover:bg-emerald-500 hover:text-black disabled:opacity-60"
        disabled={submitting}
        type="submit"
      >
        {submitting ? '[ SENDING… ]' : '[ SEND ]'}
      </button>
    </form>
  );
}

export const sendContact = createServerFn({ method: 'POST' })
  .validator(z.object({ email: z.email(), message: z.string().min(1).max(500) }))
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

export const Route = createFileRoute('/contact')({
  component: () => (
    <main className="min-h-screen bg-black text-emerald-500">
      <div className="py-12">
        <ContactForm />
      </div>
    </main>
  ),
});
