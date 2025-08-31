import { z } from 'zod';

export const titleMinLength = 3;
export const titleMaxLength = 100;

export const descriptionMinLength = 10;
export const descriptionMaxLength = 1000;

export const titleSchema = z
  .string()
  .min(titleMinLength, { message: `Title must be at least ${titleMinLength} characters.` })
  .max(titleMaxLength, { message: `Title must be at most ${titleMaxLength} characters.` });

export const descriptionSchema = z
  .string()
  .min(descriptionMinLength, { message: `Description must be at least ${descriptionMinLength} characters.` })
  .max(descriptionMaxLength, { message: `Description must be at most ${descriptionMaxLength} characters.` });

export const locationMinLength = 2;
export const locationMaxLength = 200;

export const locationSchema = z
  .string()
  .min(locationMinLength, { message: 'Please enter a location.' })
  .max(locationMaxLength, { message: `Location must be at most ${locationMaxLength} characters.` });

export const eventAtBaseSchema = z.iso.datetime();
export const eventAtTransformSchema = eventAtBaseSchema.transform((val) => new Date(val).getTime());

const createEventSchemaBaseSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  location: locationSchema,
});

export const createEventEndpointSchema = createEventSchemaBaseSchema.extend({
  eventAt: eventAtTransformSchema,
});
export const createEventFormSchema = createEventSchemaBaseSchema.extend({
  eventAt: eventAtBaseSchema,
});
