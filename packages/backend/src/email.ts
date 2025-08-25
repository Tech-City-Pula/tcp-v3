// Load env vars from packages/backend/.env if present
import 'dotenv/config';

import nodemailer, { type Transporter } from 'nodemailer';

const defaultSmtpPort = 54_325;

// Mailpit via Supabase local uses SMTP on 54325 by default when enabled in config.toml
// You can also override via env vars
const SMTP_HOST = process.env.SMTP_HOST || '127.0.0.1';
const SMTP_PORT = Number(process.env.SMTP_PORT || defaultSmtpPort);
const SMTP_SECURE = false; // Mailpit local is plain SMTP
const SMTP_USER = process.env.SMTP_USER || undefined;
const SMTP_PASS = process.env.SMTP_PASS || undefined;

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) {
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  return transporter;
}

export type SendEmailOptions = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
};

/**
 * Send an email using local Mailpit (Supabase inbucket) or any SMTP configured via env.
 * View messages at http://127.0.0.1:54324 when using Supabase local.
 */
export async function sendEmail(options: SendEmailOptions) {
  const tx = getTransporter();

  const from = options.from || process.env.MAIL_FROM || 'Admin <admin@email.com>';

  const info = await tx.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });

  return info;
}
