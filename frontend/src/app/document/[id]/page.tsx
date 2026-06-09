"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { getDocumentById } from "@/features/documents/services/documentService";
import SignatureToolbar from "@/features/signatures/components/SignatureToolbar";
import SignatureOverlay from "@/features/signatures/components/SignatureOverlay";
import TypedSignatureModal from "@/features/signatures/components/TypedSignatureModal";
import { createSignature, getSignatures } from "@/features/signatures/services/signatureService";

const PdfViewer = dynamic(
    () =>
        import(
            "@/features/documents/components/PdfViewer"
        ),
    {
        ssr: false,
    }
);

export default function DocumentPage() {
    const params = useParams();
    const id = params.id as string;

    const [document, setDocument] =
        useState<any>(null);

    const [signatureText, setSignatureText] =
        useState("");

    const [isPlacingSignature, setIsPlacingSignature] =
        useState(false);


    const [position, setPosition] =
        useState({
            x: 200,
            y: 200,
            xPercent: 0,
            yPercent: 0,
        });

    const [savedSignatures, setSavedSignatures] =
        useState<any[]>([]);

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const pdfContainerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (!id) return;

        const fetchDocument = async () => {
            try {
                const data =
                    await getDocumentById(id);

                setDocument(
                    data.document
                );

                const signatureData =
                    await getSignatures(id);

                setSavedSignatures(
                    signatureData.signatures
                );
            } catch (error) {
                console.error(error);
            }
        };

        fetchDocument();
    }, [id]);

    if (!document) {
        return (
            <DashboardLayout>
                <div className="flex h-[70vh] items-center justify-center">
                    <div className="rounded-xl bg-white px-8 py-6 shadow-sm">
                        Loading document...
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    const pdfUrl =
        `http://localhost:5000/${document.filePath.replace(
            /\\/g,
            "/"
        )}`;

    const latestSignature =
        savedSignatures.length > 0
            ? savedSignatures[0]
            : null;

    const containerWidth =
        pdfContainerRef.current?.clientWidth || 0;

    const containerHeight =
        pdfContainerRef.current?.clientHeight || 0;

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
                    <div className="mt-3">
                        <span
                            className={`rounded-full px-3 py-1 text-sm font-medium ${document.status === "signed"
                                    ? "bg-green-100 text-green-700"
                                    : document.status === "rejected"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-amber-100 text-amber-700"
                                }`}
                        >
                            {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                        </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                        Review and sign your document.
                    </p>
                </div>

                {/* Toolbar */}
                <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
                    <SignatureToolbar
                        onAddSignature={() =>
                            setIsModalOpen(true)
                        }
                    />

                    {isPlacingSignature && (
                        <p className="mt-3 text-sm font-medium text-blue-600">
                            Click anywhere on the PDF to place your signature.
                        </p>
                    )}
                </div>

                {/* PDF Workspace */}
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <div
                        ref={pdfContainerRef}
                        className="relative overflow-auto rounded-lg border border-slate-200 bg-slate-100 p-4"
                        onClick={async (e) => {
                            if (!isPlacingSignature) return;

                            const rect =
                                e.currentTarget.getBoundingClientRect();

                            const x =
                                e.clientX - rect.left;

                            const y =
                                e.clientY - rect.top;

                            const xPercent =
                                (x / rect.width) * 100;

                            const yPercent =
                                (y / rect.height) * 100;

                            const newPosition = {
                                x,
                                y,
                                xPercent,
                                yPercent,
                            };

                            setPosition(newPosition);

                            try {
                                await createSignature({
                                    documentId: id,
                                    page: 1,
                                    xPercent,
                                    yPercent,
                                    signatureType: "typed",
                                    signatureText,
                                });

                                const signatureData =
                                    await getSignatures(id);

                                setSavedSignatures(
                                    signatureData.signatures
                                );

                                setIsPlacingSignature(false);
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                    >
                        <PdfViewer fileUrl={pdfUrl} />

                        {latestSignature && (
                            <SignatureOverlay
                                text={
                                    latestSignature.signatureText
                                }
                                x={
                                    (latestSignature.xPercent /
                                        100) *
                                    containerWidth
                                }
                                y={
                                    (latestSignature.yPercent /
                                        100) *
                                    containerHeight
                                }
                            />
                        )}
                    </div>
                </div>

                <TypedSignatureModal
                    isOpen={isModalOpen}
                    onClose={() =>
                        setIsModalOpen(false)
                    }
                    onSave={(signature) => {
                        setSignatureText(signature);

                        setIsModalOpen(false);

                        setIsPlacingSignature(true);
                    }}
                />
            </div>
        </DashboardLayout>
    );
}