import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { sendEmail } from '@repo/backend/email'

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}

export const sendContact = createServerFn({ method: 'POST' })
  .validator(z.object({ email: z.string().email(), message: z.string().min(1).max(5000) }))
  .handler(async ({ data }) => {

    const info = await sendEmail({
        subject: 'test mail',
        to: 'bobobox@gmail.com',
        html: '<h1>neki tekst neznam hello world il stagod</h1>'
    })

    return { ok: true, id: info.messageId }
  })

