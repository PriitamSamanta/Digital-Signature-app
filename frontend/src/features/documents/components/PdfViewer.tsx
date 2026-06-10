"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfViewerProps {
  fileUrl: string;
}

export default function PdfViewer({
  fileUrl,
}: PdfViewerProps) {
  const [numPages, setNumPages] =
    useState<number>(0);

  const [scale, setScale] =
    useState(1);

  return (
    <div className="space-y-4">
      {/* PDF Controls */}
      <div className="sticky top-0 z-10 flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setScale((prev) =>
                Math.max(0.5, prev - 0.1)
              )
            }
            className="rounded-md border px-3 py-1 text-sm hover:bg-slate-100"
          >
            −
          </button>

          <span className="text-sm font-medium">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={() =>
              setScale((prev) =>
                Math.min(2, prev + 0.1)
              )
            }
            className="rounded-md border px-3 py-1 text-sm hover:bg-slate-100"
          >
            +
          </button>
        </div>

        <div className="text-sm text-slate-500">
          Pages: {numPages}
        </div>
      </div>

      {/* PDF Document */}
      <Document
        file={fileUrl}
        loading={
          <div className="rounded-lg bg-white p-6 text-center">
            Loading PDF...
          </div>
        }
        error={
          <div className="rounded-lg bg-red-50 p-6 text-center text-red-600">
            Failed to load PDF
          </div>
        }
        onLoadSuccess={({ numPages }) =>
          setNumPages(numPages)
        }
      >
        <div className="space-y-6">
          {Array.from(
            { length: numPages },
            (_, index) => (
              <div
                key={index}
                className="flex justify-center"
              >
                <Page
                  pageNumber={index + 1}
                  scale={scale}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                />
              </div>
            )
          )}
        </div>
      </Document>
    </div>
  );
}