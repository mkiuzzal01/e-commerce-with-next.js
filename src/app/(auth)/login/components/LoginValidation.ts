import z from "zod";

export const loginValidationSchema = z.object({
  emailOrPhone: z
    .string({ message: "Provide your email or phone" })
    .min(1, { message: "Please provide your email or phone" })
    .refine(
      (val) =>
        z.string().email().safeParse(val).success || /^\d{11}$/.test(val),
      {
        message: "Must be a valid email or a 11-digit phone number",
      }
    ),
  password: z
    .string({ message: "Provide your valid password" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});
