import * as z from "zod";

export const nameSchema = z.object({
  firstName: z.string({ message: "First name is required" }).min(1),
  middleName: z.string().optional(),
  lastName: z.string({ message: "Last name is required" }).min(1),
});

export const RegisterFormValidation = z
  .object({
    name: nameSchema,
    email: z.string({ message: "Enter your valid email" }).email(),
    phone: z
      .string({ message: "Phone number is required" })
      .length(12, "Phone number must be exactly 12 digits")
      .regex(/^\d+$/, "Phone number must contain only digits"),
    password: z
      .string({ message: "Password is required" })
      .min(6, "Confirm Password must be at least 6 characters"),
    confirmPassword: z
      .string({ message: "Password is required" })
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TRegisterForm = z.infer<typeof RegisterFormValidation>;
