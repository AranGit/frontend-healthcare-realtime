interface StatusBadgeProps {
  isSubscribed: boolean;
  className?: string;
}

export const StatusBadge = ({ isSubscribed, className }: StatusBadgeProps) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <span className="text-sm text-black">Real-Time:</span>
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${isSubscribed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isSubscribed ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
      />
      {isSubscribed ? "Active" : "Offline"}
    </div>
  </div>
);
