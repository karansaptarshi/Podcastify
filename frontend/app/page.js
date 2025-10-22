"use client";

import UploadButton from "@/components/UploadButton";

export default function UploadPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Upload a PDF File
        </h1>
        <UploadButton />
      </div>
    </div>
  );
}
