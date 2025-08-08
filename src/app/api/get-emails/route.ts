import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const emails = await kv.smembers("subscribers");
    return NextResponse.json(emails);
  } catch (error) {
    console.error("KV error:", error);
    return NextResponse.json(
      { error: "Could not retrieve emails." },
      { status: 500 }
    );
  }
}
