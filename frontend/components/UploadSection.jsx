"use client";

import { useState } from "react";
import GenerateButton from "./GenerateButton";

export default function UploadSection({ loading, setLoading }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0] ?? null);
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
      {file && (
        <p className="text-gray-700 text-sm">📄 Selected: {file.name}</p>
      )}
      <GenerateButton file={file} loading={loading} setLoading={setLoading} />
    </div>
  );
}
