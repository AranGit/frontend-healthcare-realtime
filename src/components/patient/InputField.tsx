import { PatientFormValues, patientSchema } from "@/lib/schema";
import { useMemo } from "react";
import {
  FieldError,
  FieldErrors,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  name: Path<PatientFormValues>;
  register: UseFormRegister<PatientFormValues>;
  errors: FieldErrors<PatientFormValues>;
  onFocus: (name: string) => void;
  type?: string;
  max?: string;
}

export const InputField = ({
  label,
  placeholder,
  name,
  register,
  errors,
  onFocus,
  type = "text",
  max,
}: InputFieldProps) => {
  const getNestedError = (
    fieldErrors: FieldErrors<PatientFormValues>,
    path: string,
  ): FieldError | undefined => {
    const keys = path.split(".");

    const result = keys.reduce<unknown>((acc, key) => {
      if (acc && typeof acc === "object" && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, fieldErrors);

    if (result && typeof result === "object" && "message" in result) {
      return result as FieldError;
    }
    return undefined;
  };

  const isRequired = useMemo(() => {
    const shape = patientSchema.shape;
    // case Nested Fields sush as emergencyContact.name
    if (name.includes(".")) {
      const keys = name.split(".");
      const fieldSchema = shape[keys[0] as keyof typeof shape] as unknown;
      let subSchema = fieldSchema;

      // Unwrap optional schema if needed
      if (subSchema && typeof subSchema === "object" && "unwrap" in subSchema) {
        subSchema = (subSchema as { unwrap: () => unknown }).unwrap();
      }

      // Check if it's a ZodObject with shape property
      if (subSchema && typeof subSchema === "object" && "shape" in subSchema) {
        const shape = (subSchema as { shape: Record<string, unknown> }).shape;
        const fieldDef = shape[keys[1]];
        return fieldDef &&
          typeof fieldDef === "object" &&
          "isOptional" in fieldDef
          ? !(fieldDef as { isOptional: () => boolean }).isOptional()
          : true;
      }
      return true;
    }
    return !shape[name as keyof typeof shape]?.isOptional();
  }, [name]);

  const fieldError = getNestedError(errors, name);
  const errorMessage = fieldError?.message;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
        {label}
        {isRequired && <span className="text-red-500 font-bold">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        max={type === "date" ? max : undefined}
        {...register(name)}
        onFocus={() => onFocus(label)}
        className={`border p-2.5 rounded-lg outline-none transition-all focus:ring-2 placeholder-gray-300 text-black
          ${errorMessage ? "border-red-500 bg-red-50 focus:ring-red-200" : "border-slate-300 focus:ring-blue-500"}`}
      />
      {errorMessage && (
        <span className="text-red-500 text-xs italic">{errorMessage}</span>
      )}
    </div>
  );
};
