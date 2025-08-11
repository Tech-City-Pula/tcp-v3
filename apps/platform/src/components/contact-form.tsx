import * as React from 'react'
import { sendContact } from '@/server/contact'

export default function ContactForm() {
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [ok, setOk] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)

  function isValidEmail(v: string) {
    return /.+@.+\..+/.test(v)
  }

  async function onSubmit(e: React.FormEvent) {
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
