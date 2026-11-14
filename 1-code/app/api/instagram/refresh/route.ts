import { revalidatePath, revalidateTag } from "next/cache";
import { STATS_TAG } from "@/lib/store";
import { NextResponse } from "next/server";
import { updateStats } from "@/lib/instagram";

/**
 * Daily job (see vercel.json, crons). Vercel calls it with "Authorization: Bearer <CRON_SECRET>".
 * You can also run it by hand: /api/instagram/refresh?key=<CRON_SECRET>
 */
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return NextResponse.json({ ok: false, message: "CRON_SECRET isn't set for this deployment yet (add it in Vercel, then redeploy)." }, { status: 401 });
  const given = (req.headers.get("authorization")?.replace(/^Bearer /, "") || new URL(req.url).searchParams.get("key") || "").trim();
  if (given !== secret) return NextResponse.json({ ok: false, message: "Not allowed (wrong password)" }, { status: 401 });

  const result = await updateStats();
  if (result.ok) {
    revalidateTag(STATS_TAG);
    revalidatePath("/");
    revalidatePath("/media-kit");
  }
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
