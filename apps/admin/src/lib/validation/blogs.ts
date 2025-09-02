import { z } from 'zod';

export const titleMinLength = 3;
export const titleMaxLength = 100;

export const contentMinLength = 10;
export const contentMaxLength = 1000;

export const titleSchema = z
  .string()
  .min(titleMinLength, { message: `Title must be at least ${titleMinLength} characters.` })
  .max(titleMaxLength, { message: `Title must be at most ${titleMaxLength} characters.` });

export const contentSchema = z
  .string()
  .min(contentMinLength, { message: `Description must be at least ${contentMinLength} characters.` })
  .max(contentMaxLength, { message: `Description must be at most ${contentMaxLength} characters.` });

export const createBlogsSchema = z.object({
  title: titleSchema,
  content: contentSchema,
});
