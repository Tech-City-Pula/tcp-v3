import { render, toPlainText } from '@react-email/components';
import { sendEmail } from '@repo/backend/email';
import { ContactEmail } from '@repo/backend/emails/contact-email';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const maxLength = 500;

export const sendContact = createServerFn({ method: 'POST' })
  .validator(z.object({ email: z.email(), message: z.string().min(1).max(maxLength) }))
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