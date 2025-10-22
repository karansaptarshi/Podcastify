"use client";

import { useState } from "react";

export default function UploadButton() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setMessage("Uploading...");
      // TODO: replace with real upload API later
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage("✅ File uploaded successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-3 w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
      >
        Upload
      </button>
      {message && <p className="mt-2 text-gray-700">{message}</p>}
    </div>
  );
}
