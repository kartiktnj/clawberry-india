import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { FIRST_ORDER_NUMBER, formatOrderRef } from "@/lib/orderRef";

const COUNTER_KEY = "clawberry:order-counter";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

/** Atomically hands out the next number from an Upstash Redis counter (works on Vercel). */
async function nextFromRedis(): Promise<number> {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    // Seed the counter one below the first number (only if it doesn't exist yet), then INCR.
    body: JSON.stringify([
      ["SET", COUNTER_KEY, String(FIRST_ORDER_NUMBER - 1), "NX"],
      ["INCR", COUNTER_KEY],
    ]),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis responded ${res.status}`);
  const data = (await res.json()) as { result?: unknown }[];
  const n = Number(data[1]?.result);
  if (!Number.isInteger(n)) throw new Error("Unexpected Redis response");
  return n;
}

/** Local-development counter in a git-ignored file, so the flow works without any setup. */
async function nextFromFile(): Promise<number> {
  const file = path.join(process.cwd(), ".data", "order-counter.json");
  let last = FIRST_ORDER_NUMBER - 1;
  try {
    last = JSON.parse(await fs.readFile(file, "utf8")).last ?? last;
  } catch {
    // first run
  }
  const next = last + 1;
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify({ last: next }));
  return next;
}

export async function POST() {
  try {
    let n: number;
    if (REDIS_URL && REDIS_TOKEN) {
      n = await nextFromRedis();
    } else if (process.env.NODE_ENV !== "production") {
      n = await nextFromFile();
    } else {
      console.error(
        "No order counter configured (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN). Order refs will fall back to temporary ones."
      );
      return NextResponse.json({ ok: false, error: "Counter not configured." }, { status: 503 });
    }
    return NextResponse.json({ ok: true, ref: formatOrderRef(n) }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("Could not get next order number:", err);
    return NextResponse.json({ ok: false, error: "Counter unavailable." }, { status: 503 });
  }
}
