import { z } from "zod";

export const patientSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional().or(z.literal("")),
  lastName: z.string().min(1, "Last Name is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select a gender",
  }),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+]{9,15}$/, "Invalid phone number format"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  address: z.string().min(1, "Address is required"),
  preferredLanguage: z.string().min(1, "Preferred Language is required"),
  nationality: z.string().min(1, "Nationality is required"),
  emergencyContact: z
    .object({
      name: z
        .string()
        .min(1, "Emergency contact name is required")
        .optional()
        .or(z.literal("")),
      relationship: z
        .string()
        .min(1, "Relationship is required")
        .optional()
        .or(z.literal("")),
    })
    .optional(),
  religion: z.string().optional().or(z.literal("")),
});

export type PatientFormValues = z.infer<typeof patientSchema>;
