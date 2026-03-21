import type { NextRequest } from "next/server";
import { whop } from "@/lib/whop";

export async function POST(request: NextRequest) {
  if (!whop) {
    return new Response("OK", { status: 200 });
  }

  const body = await request.text();
  const headers = Object.fromEntries(request.headers) as Record<string, string>;

  try {
    const webhookData = whop.webhooks.unwrap(body, { headers });

    if (webhookData.type === "payment.succeeded") {
      const { data } = webhookData;
      if (process.env.NODE_ENV === "development") {
        console.log("[WHOP] payment.succeeded", {
          id: data.id,
          total: data.total,
          currency: data.currency,
        });
      }
    }
  } catch {
    return new Response("Invalid signature", { status: 401 });
  }

  return new Response("OK", { status: 200 });
}
