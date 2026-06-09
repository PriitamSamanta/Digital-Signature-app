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

    const [savedSignatures, setSavedSignatures] =
        useState<any[]>([]);

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const pdfContainerRef = useRef<HTMLDivElement>(null);

    const [draftSignature, setDraftSignature] =
        useState<{
            text: string;
            x: number;
            y: number;
        } | null>(null);


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
                    {draftSignature && (
                        <button
                            onClick={async () => {
                                if (
                                    !draftSignature ||
                                    !pdfContainerRef.current
                                )
                                    return;

                                const width =
                                    pdfContainerRef.current.clientWidth;

                                const height =
                                    pdfContainerRef.current.clientHeight;

                                const safeX = Math.max(
                                    0,
                                    draftSignature.x
                                );

                                const safeY = Math.max(
                                    0,
                                    draftSignature.y
                                );

                                const xPercent =
                                    (safeX / width) * 100;

                                const yPercent =
                                    (safeY / height) * 100;


                                console.log("Draft Signature");
                                console.log(draftSignature);

                                console.log("Container Width:", width);
                                console.log("Container Height:", height);

                                console.log("xPercent:", xPercent);
                                console.log("yPercent:", yPercent);

                                try {
                                    await createSignature({
                                        documentId: id,
                                        page: 1,
                                        xPercent,
                                        yPercent,
                                        signatureType: "typed",
                                        signatureText:
                                            draftSignature.text,
                                    });

                                    const signatureData =
                                        await getSignatures(id);

                                    console.log(
                                        "Saved Signatures:",
                                        signatureData.signatures
                                    );

                                    setSavedSignatures(
                                        signatureData.signatures
                                    );

                                    setDraftSignature(null);
                                } catch (error) {
                                    console.error(error);
                                }
                            }}
                            className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                            Save Signature
                        </button>
                    )}

                </div>

                {/* PDF Workspace */}
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <div
                        ref={pdfContainerRef}
                        className="relative overflow-auto rounded-lg border border-slate-200 bg-slate-100 p-4"
                    >
                        <PdfViewer fileUrl={pdfUrl} />

                        {draftSignature && (
                            <SignatureOverlay
                                text={draftSignature.text}
                                x={draftSignature.x}
                                y={draftSignature.y}
                                draggable
                                onDragStop={(x, y) => {
                                    setDraftSignature({
                                        ...draftSignature,
                                        x,
                                        y,
                                    });
                                }}
                            />
                        )}

                        {savedSignatures.map(
                            (signature, index) => (
                                <SignatureOverlay
                                    key={index}
                                    text={
                                        signature.signatureText
                                    }
                                    x={
                                        (signature.xPercent / 100) *
                                        containerWidth
                                    }
                                    y={
                                        (signature.yPercent / 100) *
                                        containerHeight
                                    }
                                />
                            )
                        )}
                    </div>
                </div>

                <TypedSignatureModal
                    isOpen={isModalOpen}
                    onClose={() =>
                        setIsModalOpen(false)
                    }
                    onSave={(signature) => {
                        setDraftSignature({
                            text: signature,
                            x: 200,
                            y: 200,
                        });

                        setIsModalOpen(false);
                    }}
                />
            </div>
        </DashboardLayout>
    );
}