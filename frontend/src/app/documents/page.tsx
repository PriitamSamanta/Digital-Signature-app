"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import DocumentsList from "@/features/documents/components/DocumentsList";

export default function DocumentsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-6 text-3xl font-bold text-black">
            Documents
          </h1>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <DocumentsList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}