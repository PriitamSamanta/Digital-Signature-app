"use client";

import { useState } from "react";

import { uploadDocument } from "../services/documentService";

export default function UploadDocument() {
  const [file, setFile] =
    useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    try {
      await uploadDocument(file);

      alert("Upload Success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(
            e.target.files?.[0] || null
          )
        }
      />

      <button onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}