import z from 'zod';

export const nameMinLength = 2;
export const nameMaxLength = 25;

export const nameSchema = z
  .string()
  .min(nameMinLength, {
    message: `Name must be at least ${nameMinLength} characters.`,
  })
  .max(nameMaxLength, {
    message: `Name must be at most ${nameMaxLength} characters.`,
  });

export const membershipTypeSchema = z.enum(['monthly', 'yearly']);
