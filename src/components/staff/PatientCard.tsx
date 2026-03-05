import { PatientRecord } from "@/hooks/useStaffMonitoring";
import { Pencil } from "lucide-react";
import { useRef, useState } from "react";
import { StatusBadge } from "./StatusBadge";

const SECTION_CLASSNAME: string =
  "text-[10px] font-black text-slate-400 uppercase tracking-widest";

export const PatientCard = ({
  patientId,
  fields,
  status,
  activeField,
  lastUpdate,
}: PatientRecord) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-300 overflow-hidden flex flex-col transition-all hover:shadow-md">
    <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
      <span className="text-[10px] font-mono text-black font-bold uppercase tracking-widest">
        PATIENT ID: {patientId.slice(-6)}
      </span>
      <StatusBadge status={status} />
    </div>

    <div className="p-5 flex-1 space-y-6">
      <section className="space-y-3">
        <p className={SECTION_CLASSNAME}>Personal Identity</p>
        <div className="grid grid-cols-2 gap-4">
          <DataField
            label="First Name"
            value={fields.firstName || "-"}
            activeField={activeField}
          />
          <DataField
            label="Middle Name"
            value={fields.middleName || "-"}
            activeField={activeField}
          />
          <DataField
            label="Last Name"
            value={fields.lastName || "-"}
            activeField={activeField}
          />
          <DataField
            label="Date of Birth"
            value={fields.dateOfBirth || "-"}
            activeField={activeField}
          />
          <DataField
            label="Gender"
            value={fields.gender || "-"}
            activeField={activeField}
            className="capitalize"
          />
          <DataField
            label="Nationality"
            value={fields.nationality || "-"}
            activeField={activeField}
          />
        </div>
      </section>

      <section className="space-y-3 border-t border-slate-50">
        <p className={SECTION_CLASSNAME}>Contact Information</p>
        <div className="grid grid-cols-2 gap-4">
          <DataField
            label="Email"
            value={fields.email || "-"}
            activeField={activeField}
          />
          <DataField
            label="Phone Number"
            value={fields.phoneNumber || "-"}
            activeField={activeField}
          />
          <DataField
            label="Preferred Language"
            value={fields.preferredLanguage || "-"}
            activeField={activeField}
          />
          <DataField
            label="Religion"
            value={fields.religion || "-"}
            activeField={activeField}
          />
          <div className="col-span-2">
            <DataField
              label="Address"
              value={fields.address || "-"}
              textOverflowClassName="line-clamp-3 break-words"
              activeField={activeField}
            />
          </div>
        </div>
      </section>

      <section className="space-y-3 border-t border-slate-50 bg-slate-50/50 -mx-5 px-5 pb-5">
        <p className={`${SECTION_CLASSNAME} pt-3`}>Emergency Contact</p>
        <div className="grid grid-cols-2 gap-4">
          <DataField
            label="Contact Name"
            value={fields.emergencyContact?.name || "-"}
            activeField={activeField}
          />
          <DataField
            label="Relationship"
            value={fields.emergencyContact?.relationship || "-"}
            activeField={activeField}
          />
        </div>
      </section>
    </div>
    <div className="px-5 pb-4 border-t border-slate-100">
      <p className="text-[10px] text-slate-400 italic">
        Last update:{" "}
        {new Date(lastUpdate).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  </div>
);

function DataField({
  label,
  value,
  className = "",
  textOverflowClassName = "truncate",
  activeField = "",
}: {
  label: string;
  value: string;
  className?: string;
  textOverflowClassName?: string;
  activeField?: string | null;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const isEmpty = value === "-" || value.trim() === "";
  const isActive = activeField?.toLowerCase() === label.toLowerCase();

  const handleMouseEnter = () => {
    const element = textRef.current;
    if (element) {
      // truncate
      const isHorizontalOverflow = element.scrollWidth > element.offsetWidth;
      // line-clamp
      const isVerticalOverflow = element.scrollHeight > element.offsetHeight;
      // or const hasOverflow = element.scrollWidth > element.offsetWidth || element.scrollHeight > element.offsetHeight;

      setShowTooltip(isHorizontalOverflow || isVerticalOverflow);
    }
  };

  return (
    <div className="space-y-0.5">
      <p className="text-[9px] font-bold text-slate-400 uppercase flex gap-2">
        {label}
        {isActive && (
          <Pencil className="w-3 h-3 text-blue-500 animate-bounce" />
        )}
      </p>
      <div className="relative">
        <p
          ref={textRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setShowTooltip(false)}
          className={`text-sm font-semibold ${textOverflowClassName} ${
            isEmpty ? "text-slate-300 italic" : "text-slate-700"
          } ${className}`}
        >
          {value}
        </p>

        {!isEmpty && showTooltip && (
          <div className="absolute z-10 bottom-full left-0 mb-2 w-64 p-2 text-xs text-white bg-slate-800 rounded shadow-xl whitespace-normal wrap-break-word pointer-events-none animate-in fade-in zoom-in-95">
            {value}
            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-slate-800 rotate-45" />
          </div>
        )}
      </div>
    </div>
  );
}
