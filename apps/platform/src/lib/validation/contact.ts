import { z } from 'zod';

export const MIN_EMAIL_LENGTH = 3;
export const MAX_EMAIL_LENGTH = 50;
export const MIN_MESSAGE_LENGTH = 10;
export const MAX_MESSAGE_LENGTH = 500;

export const contactSchema = z.object({
  email: z
    .string()
    .min(MIN_EMAIL_LENGTH, 'Email must be at least 3 characters')
    .max(MAX_EMAIL_LENGTH, 'Email must be at most 50 characters')
    .email('Invalid email address'),
  message: z
    .string()
    .min(MIN_MESSAGE_LENGTH, 'Message must be at least 10 characters')
    .max(MAX_MESSAGE_LENGTH, 'Message must be at most 500 characters'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;