"use client";

import { useState } from "react";
import GenerateButton from "./GenerateButton";

export default function UploadSection({ loading, setLoading }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
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
      {fileName && (
        <p className="text-gray-700 text-sm">📄 Selected: {fileName}</p>
      )}
      <GenerateButton fileName={fileName} loading={loading} setLoading={setLoading} />
    </div>
  );
}
