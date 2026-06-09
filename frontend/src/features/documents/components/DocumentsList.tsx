"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getDocuments } from "../services/documentService";

export default function DocumentsList() {
  const [documents, setDocuments] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchDocuments =
      async () => {
        try {
          const data =
            await getDocuments();

          setDocuments(
            data.documents || []
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <p className="text-slate-500">
        Loading documents...
      </p>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
        <h3 className="text-lg font-semibold text-slate-700">
          No Documents Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Upload your first document to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc: any) => (
        <div
          key={doc._id}
          className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h3 className="font-semibold text-slate-800">
              {doc.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              PDF Document
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
              Pending
            </span>

            <Link
              href={`/document/${doc._id}`}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Open
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}