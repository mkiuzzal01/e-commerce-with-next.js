import { z } from "zod";

export const nameSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
});

// Create full user validation (for create)
export const userValidationSchema = z.object({
  name: nameSchema,
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  role: z.enum(["super-admin", "admin", "user"]).optional(),
  status: z.enum(["in-progress", "blocked"]).optional(),
  address: z.object({
    presentAddress: z.string({ message: "Please enter present address." }),
    permanentAddress: z.string({ message: "Please enter permanent address." }),
  }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

export type TUpdateForm = z.infer<typeof userValidationSchema>;
