import PusherClient from "pusher-js";

// Client (Patient Form/Staff View)
// Only used clint for this assignment, but server can also be used for other purposes
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  },
);
