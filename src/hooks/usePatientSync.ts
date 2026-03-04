import { pusherClient } from "@/lib/pusher";
import { PatientFormValues } from "@/lib/schema";
import debounce from "lodash.debounce";
import { Channel } from "pusher-js";
import { useCallback, useEffect, useRef, useState } from "react";

export const usePatientSync = (
  patientId: string,
  getValues: () => PatientFormValues,
) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const activeFieldRef = useRef<string | null>(null);
  const channelRef = useRef<Channel | null>(null);

  const sendUpdate = useCallback(
    (
      status: "typing" | "submitted" | "active" | "inactive",
      fieldName?: string,
    ) => {
      const channel = channelRef.current;
      if (channel && isSubscribed) {
        channel.trigger("client-status-update", {
          patientId,
          status,
          activeField: fieldName || activeFieldRef.current,
          fields: getValues(),
        });
      }
    },
    [patientId, isSubscribed, getValues],
  );

  const debouncedSyncRef = useRef<ReturnType<typeof debounce> | null>(null);

  useEffect(() => {
    debouncedSyncRef.current = debounce(() => sendUpdate("typing"), 400);
  }, [sendUpdate]);

  useEffect(() => {
    const channel = pusherClient.subscribe(`private-patient-channel`);
    channelRef.current = channel;

    channel.bind("pusher:subscription_succeeded", () => setIsSubscribed(true));

    const handleVisibility = () =>
      sendUpdate(document.hidden ? "inactive" : "active");
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      pusherClient.unsubscribe(`private-patient-channel`);
    };
  }, [sendUpdate]);

  const handleFocus = (name: string) => {
    activeFieldRef.current = name;
    sendUpdate("typing", name);
  };

  return { isSubscribed, sendUpdate, debouncedSyncRef, handleFocus };
};
