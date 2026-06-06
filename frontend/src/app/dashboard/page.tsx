"use client";

import UploadDocument from "@/features/documents/components/UploadDocument";
import DocumentsList from "@/features/documents/components/DocumentsList";

export default function DashboardPage() {
  return (
    <main className="p-6">
      <h1>
        Digital Signature Dashboard
      </h1>

      <UploadDocument />

      <DocumentsList />
    </main>
  );
}