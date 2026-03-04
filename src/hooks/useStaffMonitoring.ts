import { pusherClient } from "@/lib/pusher";
import { PatientFormValues } from "@/lib/schema";
import { useEffect, useState } from "react";

export interface PatientRecord {
  patientId: string;
  fields: Partial<PatientFormValues>;
  status: "typing" | "submitted" | "active" | "inactive";
  activeField: string | null;
  lastUpdate: number;
}

export const useStaffMonitoring = () => {
  const [patients, setPatients] = useState<Record<string, PatientRecord>>({});

  useEffect(() => {
    const channel = pusherClient.subscribe("private-patient-channel");

    channel.bind("client-status-update", (data: PatientRecord) => {
      setPatients((prev) => ({
        ...prev,
        [data.patientId]: {
          ...prev[data.patientId],
          ...data,
          lastUpdate: Date.now(),
        },
      }));
    });

    return () => {
      pusherClient.unsubscribe("private-patient-channel");
    };
  }, []);

  return { patients: Object.values(patients) };
};
