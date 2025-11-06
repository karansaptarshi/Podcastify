// NOTE
//----------------------------------------------------
// This endpoint uses a mock S3 approach: it saves PDFs locally
// cuz we gotta pay for AWS S3!
//----------------------------------------------------

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    // Get the uploaded file
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Accept only PDFs
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDFs allowed" }, { status: 400 });
    }

    // Generate a unique ID
    const fileId = uuidv4();

    // Ensure uploads folder exists
    const uploadsDir = path.join(process.cwd(), "app", "api", "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    // Save file locally with unique ID as filename
    const filePath = path.join(uploadsDir, `${fileId}.pdf`);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Mock S3 URL (local path for now)
    const s3Url = `/uploads/${fileId}.pdf`;

    // Return JSON with file ID and URL
    return NextResponse.json({ id: fileId, s3_url: s3Url });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
