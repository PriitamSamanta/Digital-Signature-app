"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

import UploadDocument from "@/features/documents/components/UploadDocument";
import DocumentsList from "@/features/documents/components/DocumentsList";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Digital Signature Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Upload, manage and sign documents securely.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Total Documents
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                0
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Pending Signatures
              </p>

              <h2 className="mt-2 text-3xl font-bold text-amber-500">
                0
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Signed Documents
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                0
              </h2>
            </div>
          </div>

          {/* Upload Section */}
          <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Upload Document
            </h2>

            <UploadDocument />
          </div>

          {/* Documents Section */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Recent Documents
            </h2>

            <DocumentsList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}