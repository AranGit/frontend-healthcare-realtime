import { z } from "zod";

export const patientSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .max(50, "First Name must be less than 50 characters")
    .regex(/^\S*$/, "Spaces are not allowed in this field"),
  middleName: z
    .string()
    .max(50, "Middle Name must be less than 50 characters")
    .regex(/^\S*$/, "Spaces are not allowed in this field")
    .optional()
    .or(z.literal("")),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .max(50, "Last Name must be less than 50 characters")
    .regex(/^\S*$/, "Spaces are not allowed in this field"),
  dateOfBirth: z
    .string()
    .min(1, "Date of Birth is required")
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(
          selectedDate.getHours(),
          selectedDate.getMinutes(),
          selectedDate.getSeconds(),
          selectedDate.getMilliseconds(),
        );
        return selectedDate <= today;
      },
      {
        message: "Date of Birth cannot be in the future",
      },
    ),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select a gender",
  }),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+]{9,15}$/, "Invalid phone number format"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  address: z.string().min(1, "Address is required"),
  preferredLanguage: z
    .string()
    .min(1, "Preferred Language is required")
    .max(50, "Preferred Language must be less than 50 characters")
    .regex(/^\S.*$/, "Preferred cannot start with a blank space"),
  nationality: z
    .string()
    .min(1, "Nationality is required")
    .max(50, "Nationality must be less than 50 characters")
    .regex(/^\S.*$/, "Nationality cannot start with a blank space"),
  emergencyContact: z
    .object({
      name: z
        .string()
        .max(150, "Contact Name must be less than 150 characters")
        .regex(/^\S.*$/, "Contact Name cannot start with a blank space")
        .optional()
        .or(z.literal("")),
      relationship: z
        .string()
        .max(50, "Relationship must be less than 50 characters")
        .regex(/^\S.*$/, "Relationship cannot start with a blank space")
        .optional()
        .or(z.literal("")),
    })
    .optional(),
  religion: z
    .string()
    .max(50, "Religion must be less than 50 characters")
    .regex(/^\S.*$/, "Religion cannot start with a blank space")
    .optional()
    .or(z.literal("")),
});

export type PatientFormValues = z.infer<typeof patientSchema>;
