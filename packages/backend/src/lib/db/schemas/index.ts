import { authSchema } from './schema.auth.ts';
import { contactSchema } from './schema.contact.ts';
import { publicSchema } from './schema.public.ts';

export const schema = {
  ...authSchema,
  ...publicSchema,
  ...contactSchema,
};
