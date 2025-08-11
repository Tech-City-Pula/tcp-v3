import { createServerFn } from '@tanstack/react-start'
import nodemailer from 'nodemailer'
import { z } from 'zod'

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}

export const sendContact = createServerFn({ method: 'POST' })
  .validator(z.object({ email: z.string().email(), message: z.string().min(1).max(5000) }))
  .handler(async ({ data }) => {
    const {
      SMTP_HOST = 'localhost',
      SMTP_PORT = '1025',
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO_EMAIL,
      CONTACT_FROM_EMAIL = 'no-reply@localhost',
    } = process.env

    if (!CONTACT_TO_EMAIL) {
      throw new Error('CONTACT_TO_EMAIL env var not set')
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: false,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    })

    const info = await transporter.sendMail({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      subject: `[Contact] Message from ${data.email}`,
      text: data.message,
      html: `<pre style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; white-space: pre-wrap">${escapeHtml(data.message)}</pre>`,
      replyTo: data.email,
    })

    return { ok: true, id: info.messageId }
  })
