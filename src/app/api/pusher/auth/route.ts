import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const params = new URLSearchParams(body);

    const socketId = params.get("socket_id");
    const channelName = params.get("channel_name");

    if (!socketId || !channelName) {
      return new NextResponse("Missing socket_id or channel_name", {
        status: 400,
      });
    }

    const authResponse = pusherServer.authorizeChannel(socketId, channelName);

    return NextResponse.json(authResponse);
  } catch (error) {
    console.error("Pusher Auth Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
