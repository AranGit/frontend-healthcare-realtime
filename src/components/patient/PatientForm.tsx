"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { FormSection } from "./FormSection";
import { InputField } from "./InputField";
import { StatusBadge } from "./StatusBadge";

import { usePatientSync } from "@/hooks/usePatientSync";
import { PatientFormValues, patientSchema } from "@/lib/schema";

const RREQUIRED_SYMBOL = <span className="text-red-500 font-bold">*</span>;

export function PatientForm() {
  const [patientID, setPatientID] = useState<string>("");

  useEffect(() => {
    // should be UUID in production, using random string for demo purposes
    setPatientID(`p-${Math.random().toString(36).substring(2, 9)}`);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema), // Centralized Validation
    mode: "onChange",
  });

  const { isSubscribed, sendUpdate, debouncedSyncRef, handleFocus } =
    usePatientSync(patientID, getValues);

  useEffect(() => {
    const sub = watch(() => {
      if (isSubscribed) debouncedSyncRef.current?.();
    });
    return () => sub.unsubscribe();
  }, [watch, isSubscribed, debouncedSyncRef]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <form
        onSubmit={handleSubmit(() => sendUpdate("submitted"))}
        className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-300 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 border-b space-y-2">
          <div>
            <h2 className="justify-self-start text-3xl font-black text-green-600 tracking-tight">
              PATIENT REGISTRATION
            </h2>
            <p className="text-slate-600 text-sm font-bold">
              Patient ID: {patientID && patientID.slice(-6).toUpperCase()}
            </p>
          </div>
          <StatusBadge
            isSubscribed={isSubscribed}
            className="md:justify-self-end"
          />
        </div>

        <FormSection title="Personal Identity">
          <InputField
            label="First Name"
            name="firstName"
            placeholder="e.g. Aran"
            register={register}
            errors={errors}
            onFocus={handleFocus}
          />
          <InputField
            label="Middle Name"
            name="middleName"
            placeholder="e.g. D."
            register={register}
            errors={errors}
            onFocus={handleFocus}
          />
          <InputField
            label="Last Name"
            name="lastName"
            placeholder="e.g. Kochhiran"
            register={register}
            errors={errors}
            onFocus={handleFocus}
          />
          <InputField
            label="Date of Birth"
            name="dateOfBirth"
            register={register}
            errors={errors}
            onFocus={handleFocus}
            type="date"
            max={today}
          />

          <div className="flex flex-col gap-1">
            <label className="flex gap-1 text-sm font-semibold text-slate-700">
              Gender
              {RREQUIRED_SYMBOL}
            </label>
            <select
              {...register("gender")}
              defaultValue=""
              required
              onFocus={() => handleFocus("Gender")}
              className={`min-h-11.5 text-black invalid:text-gray-300 border p-2.5 rounded-lg outline-none transition-all focus:ring-2 focus:ring-blue-500 ${errors.gender ? "border-red-500 bg-red-50" : "border-slate-300"}`}
            >
              <option value="" disabled hidden>
                Select Gender..
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-xs italic">
                {errors.gender.message}
              </span>
            )}
          </div>

          <InputField
            label="Nationality"
            name="nationality"
            placeholder="e.g. Thai"
            register={register}
            errors={errors}
            onFocus={handleFocus}
          />
        </FormSection>

        <FormSection title="Contact Information">
          <InputField
            label="Email"
            name="email"
            placeholder="name@example.com"
            register={register}
            errors={errors}
            onFocus={handleFocus}
            type="email"
          />
          <InputField
            label="Phone Number"
            name="phoneNumber"
            placeholder="e.g. 0812345678"
            register={register}
            errors={errors}
            onFocus={handleFocus}
          />
          <InputField
            label="Preferred Language"
            name="preferredLanguage"
            placeholder="e.g. English, Thai"
            register={register}
            errors={errors}
            onFocus={handleFocus}
          />
          <InputField
            label="Religion"
            name="religion"
            placeholder="e.g. Buddhism, Christianity, None"
            register={register}
            errors={errors}
            onFocus={handleFocus}
          />
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700 flex gap-1">
              Address
              {RREQUIRED_SYMBOL}
            </label>
            <textarea
              {...register("address")}
              placeholder="123 Example Rd, Bangkok, Thailand"
              onFocus={() => handleFocus("Address")}
              className={`w-full border p-2.5 rounded-lg outline-none transition-all focus:ring-2 focus:ring-blue-500 min-h-25 placeholder-gray-300 text-black ${errors.address ? "border-red-500 bg-red-50" : "border-slate-300"}`}
            />
            {errors.address && (
              <span className="text-red-500 text-xs italic">
                {errors.address.message}
              </span>
            )}
          </div>
        </FormSection>

        <FormSection title="Emergency Contact">
          <InputField
            label="Contact Name"
            name="emergencyContact.name"
            register={register}
            errors={errors}
            onFocus={handleFocus}
            placeholder="Full name of contact person"
          />
          <InputField
            label="Relationship"
            name="emergencyContact.relationship"
            placeholder="e.g. Mother, Father"
            register={register}
            errors={errors}
            onFocus={handleFocus}
          />
        </FormSection>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-[0.98]"
            disabled={!isDirty || !isValid}
          >
            SUBMIT
          </button>
        </div>
        {isSubscribed && (
          <div className="text-center">
            <p className="text-slate-400 text-xs">
              Your data is being synchronized in real-time with our staffs.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
