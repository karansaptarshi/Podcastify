import { NextResponse } from "next/server";
import { db } from "../../lib/db";
import { randomUUID } from "crypto";

const BUCKET = process.env.S3_BUCKET!;
const REGION = process.env.AWS_REGION!;
const PUBLIC_BUCKET = (process.env.PUBLIC_BUCKET ?? "true") === "true";

export async function POST(req: Request) {
  try {
    const { id, s3_key } = await req.json();
    if (!id || !s3_key) {
      return NextResponse.json({ error: "id and s3_key required" }, { status: 400 });
    }
    const s3_url = PUBLIC_BUCKET
      ? `https://${BUCKET}.s3.${REGION}.amazonaws.com/${s3_key}`
      : `s3://${BUCKET}/${s3_key}`;

    const job_id = randomUUID();

    const client = await db().connect();
    try {
      await client.query("BEGIN");
      await client.query(
        `INSERT INTO uploads (id, s3_key, s3_url)
         VALUES ($1,$2,$3)
         ON CONFLICT (id) DO UPDATE
         SET s3_key = EXCLUDED.s3_key, s3_url = EXCLUDED.s3_url`,
        [id, s3_key, s3_url]
      );
      await client.query(
        `INSERT INTO jobs (job_id, upload_id, status)
         VALUES ($1,$2,'queued')`,
        [job_id, id]
      );
      await client.query("COMMIT");
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
    return NextResponse.json({ id, s3_url, job_id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "finalize_failed" }, { status: 500 });
  }
}
