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

  return (
    <Document
      file={fileUrl}
      onLoadSuccess={({ numPages }) =>
        setNumPages(numPages)
      }
    >
      {Array.from(
        { length: numPages },
        (_, index) => (
          <Page
            key={index}
            pageNumber={index + 1}
          />
        )
      )}
    </Document>
  );
}