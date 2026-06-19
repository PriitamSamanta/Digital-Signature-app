"use client";

import { useState } from "react";
import { toast } from "sonner";
import { uploadDocument } from "../services/documentService";

export default function UploadDocument() {
  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      await uploadDocument(file);

      toast.success("Upload Success");

      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 text-black">
      <label
        htmlFor="pdf-upload"
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center text-black transition hover:border-blue-500 hover:bg-blue-50"
      >
        <div className="space-y-2">
          <p className="text-lg font-semibold text-slate-700">
            Upload PDF Document
          </p>

          <p className="text-sm text-slate-500">
            Click here to select a PDF file
          </p>

          {file && (
            <p className="font-medium text-blue-600">
              {file.name}
            </p>
          )}
        </div>

        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] || null
            )
          }
        />
      </label>

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {loading
          ? "Uploading..."
          : "Upload Document"}
      </button>
    </div>
  );
}