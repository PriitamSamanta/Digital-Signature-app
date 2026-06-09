"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import UploadDocument from "@/features/documents/components/UploadDocument";
import DocumentsList from "@/features/documents/components/DocumentsList";

import { getDocuments } from "@/features/documents/services/documentService";

export default function DashboardPage() {
  const [totalDocuments, setTotalDocuments] =
    useState(0);

  const [pendingDocuments, setPendingDocuments] =
    useState(0);

  const [signedDocuments, setSignedDocuments] =
    useState(0);

  useEffect(() => {
    const fetchDashboardData =
      async () => {
        try {
          const data =
            await getDocuments();

          const documents =
            data.documents || [];

          setTotalDocuments(
            documents.length
          );

          setPendingDocuments(
            documents.filter(
              (doc: any) =>
                doc.status === "pending"
            ).length
          );

          setSignedDocuments(
            documents.filter(
              (doc: any) =>
                doc.status === "signed"
            ).length
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchDashboardData();
  }, []);

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
                {totalDocuments}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Pending Documents
              </p>

              <h2 className="mt-2 text-3xl font-bold text-amber-500">
                {pendingDocuments}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Signed Documents
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {signedDocuments}
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