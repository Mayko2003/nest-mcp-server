import { randomBytes } from 'crypto';

export const randomString = (length: number) => {
  return randomBytes(length).toString('hex');
};
