import { z } from 'zod';

export const createUserToolSchema = {
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
};
