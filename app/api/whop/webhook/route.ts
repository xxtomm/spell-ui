import type { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { whop } from "@/lib/whop";
import { db } from "@/db";
import { sponsors } from "@/db/schemas/sponsor";
import { users } from "@/db/schemas/auth";

const PLAN_TIER_MAP: Record<string, string> = {
  [process.env.WHOP_PLAN_ID_SILVER ?? ""]: "silver",
  [process.env.WHOP_PLAN_ID_GOLD ?? ""]: "gold",
  [process.env.WHOP_PLAN_ID_PLATINUM ?? ""]: "platinum",
  [process.env.WHOP_PLAN_ID_DIAMOND ?? ""]: "diamond",
};

export async function POST(request: NextRequest) {
  if (!whop) {
    return new Response("OK", { status: 200 });
  }

  const body = await request.text();
  const headers = Object.fromEntries(request.headers) as Record<
    string,
    string
  >;

  try {
    const webhookData = whop.webhooks.unwrap(body, { headers });

    if (webhookData.type === "payment.succeeded") {
      const { data } = webhookData;
      const email = (data.member as { user?: { email?: string } })?.user?.email;
      const planId = data.plan?.id;
      const tierId = planId ? (PLAN_TIER_MAP[planId] ?? "unknown") : "unknown";

      if (email) {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (user) {
          await db
            .insert(sponsors)
            .values({
              userId: user.id,
              tierId,
              whopPaymentId: data.id,
              amount: data.total ?? 0,
              currency: data.currency ?? "usd",
              status: "active",
            })
            .onConflictDoNothing();
        }
      }
    }
  } catch {
    return new Response("Invalid signature", { status: 401 });
  }

  return new Response("OK", { status: 200 });
}
