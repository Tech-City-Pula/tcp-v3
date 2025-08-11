import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { sendEmail } from '@repo/backend/email'
import { useState, FormEvent } from 'react'

function ContactForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function isValidEmail(v: string) {
    return /.+@.+\..+/.test(v)
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setOk(null)

    if (!isValidEmail(email)) {
      setError('Enter a valid email')
      return
    }
    if (!message.trim()) {
      setError('Message cannot be empty')
      return
    }

    setSubmitting(true)
    try {
      const res = await sendContact({ data: { email, message } })
      if (res?.ok) {
        setOk('Message sent. Check MailHog.')
        setEmail('')
        setMessage('')
      } else {
        setError('Failed to send. Try again.')
      }
    } catch (err) {
      setError('Failed to send. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl mx-auto p-6 border border-emerald-500/40 bg-black/70">
      <h2 className="font-mono text-emerald-500 text-xl mb-4">
        <span className="text-white">[</span> CONTACT_US <span className="text-white">]</span>
      </h2>
      <div className="mb-3">
        <label htmlFor="contact-email" className="block font-mono text-sm text-emerald-400 mb-1">
          EMAIL
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black text-emerald-100 border border-emerald-500/40 focus:border-emerald-500 outline-none px-3 h-11"
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contact-message" className="block font-mono text-sm text-emerald-400 mb-1">
          MESSAGE
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-black text-emerald-100 border border-emerald-500/40 focus:border-emerald-500 outline-none px-3 py-2 min-h-[140px]"
          placeholder="Write your message…"
          required
        />
      </div>
      {error ? <p className="text-red-400 font-mono text-sm mb-3">{error}</p> : null}
      {ok ? <p className="text-emerald-400 font-mono text-sm mb-3">{ok}</p> : null}
      <button
        type="submit"
        disabled={submitting}
        className="font-mono font-bold px-6 py-3 border-2 border-emerald-500 text-emerald-500 bg-black cursor-pointer transition-all duration-300 hover:bg-emerald-500 hover:text-black disabled:opacity-60"
      >
        {submitting ? '[ SENDING… ]' : '[ SEND ]'}
      </button>
    </form>
  )
}


export const sendContact = createServerFn({ method: 'POST' })
  .validator(z.object({ email: z.email(), message: z.string().min(1).max(500) }))
  .handler(async ({ data }) => {

    const info = await sendEmail({
        subject: 'test mail',
        to: data.email,
        text: data.message
    })

    return { ok: true, id: info.messageId }
  })


export const Route = createFileRoute('/contact')({
  component: () => (
    <main className="min-h-screen bg-black text-emerald-500">
      <div className="py-12">
        <ContactForm />
      </div>
    </main>
  ),
})
