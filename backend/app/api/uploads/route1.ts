//NOTE 
//----------------------------------------------------
//This just uses a mock S3 because we gotta pay to use the simple storage of AWS
//----------------------------------------------------

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    //this basically throws an error if its not a pdf uploaded
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDFs allowed" }, { status: 400 });
    }

    // Generate a unique ID for the file
    const fileId = uuidv4();

    // Create uploads folder if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "app", "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

    // Save file locally with unique ID as filename
    const filePath = path.join(uploadsDir, `${fileId}.pdf`);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Mock S3 URL (just a local path for now)
    const s3Url = `/uploads/${fileId}.pdf`;

    return NextResponse.json({ id: fileId, s3_url: s3Url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}