import z from 'zod';

export const passwordMinLength = 8;
export const passwordMaxLength = 72;

export const emailMinLength = 8;
export const emailMaxLength = 256;

export const emailSchema = z
  .string()
  .email({ message: 'Please enter a valid email address.' })
  .min(emailMinLength, { message: `Email must be at least ${emailMinLength} characters.` })
  .max(emailMaxLength, { message: `Email must be at most ${emailMaxLength} characters.` });

export const passwordSchema = z
  .string()
  .min(passwordMinLength, { message: `Password must be at least ${passwordMinLength} characters.` })
  .max(passwordMaxLength, { message: `Password must be at most ${passwordMaxLength} characters.` });

export const loginInputSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginInput = z.infer<typeof loginInputSchema>;
