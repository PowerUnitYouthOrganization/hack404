import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return new Response(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!, {
    status: 200,
  });
}
