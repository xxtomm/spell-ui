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
      id: sponsors.id,
      tierId: sponsors.tierId,
      logoUrl: sponsors.logoUrl,
      logoDarkUrl: sponsors.logoDarkUrl,
      websiteUrl: sponsors.websiteUrl,
    })
    .from(sponsors)
    .where(eq(sponsors.userId, session.user.id))
    .orderBy(desc(sponsors.createdAt))
    .limit(1);

  return Response.json({ sponsor: sponsor ?? null });
}

export async function PATCH(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { logoUrl, logoDarkUrl, websiteUrl } = body as {
    logoUrl?: string;
    logoDarkUrl?: string;
    websiteUrl?: string;
  };

  const [sponsor] = await db
    .select({ id: sponsors.id })
    .from(sponsors)
    .where(eq(sponsors.userId, session.user.id))
    .orderBy(desc(sponsors.createdAt))
    .limit(1);

  if (!sponsor) {
    return Response.json({ error: "No sponsorship found" }, { status: 404 });
  }

  await db
    .update(sponsors)
    .set({
      ...(logoUrl !== undefined ? { logoUrl } : {}),
      ...(logoDarkUrl !== undefined ? { logoDarkUrl } : {}),
      ...(websiteUrl !== undefined ? { websiteUrl } : {}),
    })
    .where(eq(sponsors.id, sponsor.id));

  return Response.json({ ok: true });
}
