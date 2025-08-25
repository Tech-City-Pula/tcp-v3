import { z } from "zod";

export const emailMinLength = 8;
export const emailMaxLength = 256;

export const emailSchema = z
	.string()
	.email({ message: "Please enter a valid email address." })
	.min(emailMinLength, {
		message: `Email must be at least ${emailMinLength} characters.`,
	})
	.max(emailMaxLength, {
		message: `Email must be at most ${emailMaxLength} characters.`,
	});

export const eventAttendanceSchema = z.object({
	email: emailSchema,
});

export const newsletterSchema = z.object({
	email: emailSchema,
});

export type EventAttendanceInput = z.infer<typeof eventAttendanceSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
