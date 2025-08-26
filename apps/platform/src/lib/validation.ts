import { z } from 'zod';

export const emailMinLength = 8;
export const emailMaxLength = 256;

export const titleMinLength = 3;
export const titleMaxLength = 100;

export const descriptionMinLength = 10;
export const descriptionMaxLength = 500;

export const emailSchema = z
  .string()
  .email({ message: 'Please enter a valid email address.' })
  .min(emailMinLength, {
    message: `Email must be at least ${emailMinLength} characters.`,
  })
  .max(emailMaxLength, {
    message: `Email must be at most ${emailMaxLength} characters.`,
  });

export const titleSchema = z
  .string()
  .min(titleMinLength, {
    message: `Title must be at least ${titleMinLength} characters.`,
  })
  .max(titleMaxLength, {
    message: `Title must be at most ${titleMaxLength} characters.`,
  });

export const descriptionSchema = z
  .string()
  .min(descriptionMinLength, {
    message: `Description must be at least ${descriptionMinLength} characters.`,
  })
  .max(descriptionMaxLength, {
    message: `Description must be at most ${descriptionMaxLength} characters.`,
  });

export const eventAttendanceSchema = z.object({
  email: emailSchema,
});

export const newsletterSchema = z.object({
  email: emailSchema,
});

export const submitTalkSchema = z.object({
  email: emailSchema,
  title: titleSchema,
  description: descriptionSchema,
});

export type EventAttendanceInput = z.infer<typeof eventAttendanceSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type SubmitTalkInput = z.infer<typeof submitTalkSchema>;
