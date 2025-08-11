import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { sendEmail } from '@repo/backend/email'

export const sendContact = createServerFn({ method: 'POST' })
  .validator(z.object({ email: z.string().email(), message: z.string().min(1).max(5000) }))
  .handler(async ({ data }) => {

    const info = await sendEmail({
        subject: 'test mail',
        to: data.email,
        text: data.message
    })

    return { ok: true, id: info.messageId }
  })

