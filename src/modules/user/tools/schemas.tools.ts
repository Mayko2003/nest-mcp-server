import { z } from 'zod';
import { ValidationMessages } from 'src/shared/validation/validation.messages';

export const checkIdSchema = {
  id: z.string({ message: ValidationMessages.IS_STRING }),
};

export const createUserToolSchema = {
  email: z
    .string({ message: ValidationMessages.IS_STRING })
    .email({ message: ValidationMessages.IS_EMAIL }),
  username: z.string({ message: ValidationMessages.IS_STRING }),
  password: z.string({ message: ValidationMessages.IS_STRING }).refine(
    (val) => {
      const hasLength = val.length >= 8;
      const hasUpperCase = /[A-Z]/.test(val);
      const hasLowerCase = /[a-z]/.test(val);
      const hasNumber = /\d/.test(val);
      const hasSpecialChar = /[!@#$%^&*]/.test(val);
      return (
        hasLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
      );
    },
    {
      message: ValidationMessages.IS_STRONG_PASSWORD,
    },
  ),
  firstName: z.string({ message: ValidationMessages.IS_STRING }),
  lastName: z.string({ message: ValidationMessages.IS_STRING }),
};

export const updateUserToolSchema = {
  ...checkIdSchema,
  email: z
    .string({ message: ValidationMessages.IS_STRING })
    .email({ message: ValidationMessages.IS_EMAIL }),
  username: z.string({ message: ValidationMessages.IS_STRING }),
  firstName: z.string({ message: ValidationMessages.IS_STRING }),
  lastName: z.string({ message: ValidationMessages.IS_STRING }),
};
