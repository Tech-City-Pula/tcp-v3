import { authSchema } from './schema.auth.ts';
import { publicSchema } from './schema.public.ts';

export const schema = {
  ...authSchema,
  ...publicSchema,
};
