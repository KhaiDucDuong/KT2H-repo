import { z } from "zod";

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*$/
);

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email must be filled" })
      .email("This is not a valid email"),
    username: z
      .string()
      .min(5, { message: "Username must be between 5 and 50 characters" })
      .max(50, { message: "Username must be between 5 and 50 characters" }),
    first_name: z.string().min(1, { message: "First name must be filled" }),
    last_name: z.string().min(1, { message: "Last name must be filled" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long. " })
      .regex(passwordValidation, {
        message:
          "Password must contain at least 1 character, 1 number, 1 special character, and 1 capital character. ",
      }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export const loginSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(8),
});

export const oauth2AccountRegistrationSchema = z
  .object({
    username: z
      .string()
      .min(5, { message: "Username must be between 5 and 50 characters" })
      .max(50, { message: "Username must be between 5 and 50 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long. " })
      .regex(passwordValidation, {
        message:
          "Password must contain at least 1 character, 1 number, 1 special character, and 1 capital character. ",
      }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });
