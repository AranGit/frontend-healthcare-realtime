"use client";

import PatientCard from "@/components/staff/PatientCard";
import { useStaffMonitoring } from "@/hooks/useStaffMonitoring";

export default function StaffPage() {
  const { patients } = useStaffMonitoring();

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <header className="max-w-7xl mx-auto mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-blue-600 uppercase tracking-tighter">
            STAFF MONITORING DASHBOARD
          </h1>
          <p className="text-slate-500 font-medium">
            Real-time Patient Activity Feed
          </p>
        </div>
        <div className="text-xs font-bold text-slate-400">
          Total: {patients.length} Patients
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.length === 0 ? (
          <div className="col-span-full py-32 text-center text-slate-400 font-bold border-4 border-dashed rounded-3xl">
            NO ACTIVE PATIENTS
          </div>
        ) : (
          // can be sorted by lastUpdate desc if needed or up to business logic
          // can be filtered by status if needed or up to business logic
          // can be paginated if needed or up to business logic
          // can be searched by patientId or name if needed or up to business logic
          patients.map((patient) => (
            <PatientCard key={patient.patientId} {...patient} />
          ))
        )}
      </div>
    </div>
  );
}
