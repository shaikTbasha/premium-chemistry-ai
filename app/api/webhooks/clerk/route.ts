import { verifyWebhook } from "@clerk/backend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req);

    console.log("Clerk webhook received:", evt.type);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Clerk webhook verification failed:", error);

    return NextResponse.json(
      { success: false, message: "Invalid webhook" },
      { status: 400 }
    );
  }
}