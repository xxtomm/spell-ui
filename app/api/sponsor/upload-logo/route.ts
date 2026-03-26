import { put } from "@vercel/blob";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { sponsors } from "@/db/schemas/sponsor";
import { eq, desc } from "drizzle-orm";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [sponsor] = await db
    .select({ id: sponsors.id })
    .from(sponsors)
    .where(eq(sponsors.userId, session.user.id))
    .orderBy(desc(sponsors.createdAt))
    .limit(1);

  if (!sponsor) {
    return Response.json({ error: "No sponsorship found" }, { status: 404 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "File must be an image" }, { status: 400 });
  }

  if (file.size > 2 * 1024 * 1024) {
    return Response.json({ error: "File must be under 2MB" }, { status: 400 });
  }

  const blob = await put(`sponsor-logos/${sponsor.id}-${file.name}`, file, {
    access: "public",
  });

  await db
    .update(sponsors)
    .set({ logoUrl: blob.url })
    .where(eq(sponsors.id, sponsor.id));

  return Response.json({ url: blob.url });
}
