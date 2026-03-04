export const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    typing: "bg-blue-100 text-blue-700 animate-pulse",
    submitted: "bg-green-100 text-green-700",
    inactive: "bg-slate-100 text-slate-500",
    active: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${styles[status] || styles.active}`}
    >
      {status}
    </span>
  );
};
