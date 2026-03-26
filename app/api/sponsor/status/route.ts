import { auth } from "@/lib/auth";
import { db } from "@/db";
import { sponsors } from "@/db/schemas/sponsor";
import { eq, desc } from "drizzle-orm";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ sponsor: null });
  }

  const [sponsor] = await db
    .select({
      tierId: sponsors.tierId,
      status: sponsors.status,
      createdAt: sponsors.createdAt,
    })
    .from(sponsors)
    .where(eq(sponsors.userId, session.user.id))
    .orderBy(desc(sponsors.createdAt))
    .limit(1);

  return Response.json({ sponsor: sponsor ?? null });
}
