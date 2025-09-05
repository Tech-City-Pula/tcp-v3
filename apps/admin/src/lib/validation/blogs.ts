import { z } from 'zod';

export const titleMinLength = 3;
export const titleMaxLength = 100;

export const contentMinLength = 10;
export const contentMaxLength = 10_000;

export const titleSchema = z
  .string()
  .min(titleMinLength, { message: `Title must be at least ${titleMinLength} characters.` })
  .max(titleMaxLength, { message: `Title must be at most ${titleMaxLength} characters.` });

export const contentSchema = z
  .string()
  .min(contentMinLength, { message: `Content must be at least ${contentMinLength} characters.` })
  .max(contentMaxLength, { message: `Content must be at most ${contentMaxLength} characters.` });

const createBlogSchemaBase = z.object({
  title: titleSchema,
  content: contentSchema,
});

export const createBlogEndpointSchema = createBlogSchemaBase;
export const createBlogFormSchema = createBlogSchemaBase;
