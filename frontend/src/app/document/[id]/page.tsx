"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
    getDocumentById,
    finalizeDocument,
    downloadSignedPdf,
    generatePublicLink,
    sendInvitation,
    getAuditLogs,
} from "@/features/documents/services/documentService";

import SignatureToolbar from "@/features/signatures/components/SignatureToolbar";
import SignatureOverlay from "@/features/signatures/components/SignatureOverlay";
import TypedSignatureModal from "@/features/signatures/components/TypedSignatureModal";

import {
    createSignature,
    getSignatures,
    deleteSignature,
    resizeSignature,
} from "@/features/signatures/services/signatureService";
import {
    Signature,
    DraftSignature,
} from "@/features/signatures/types/signature";
import { Document } from "@/features/documents/types/document";

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

    const [pdfSize, setPdfSize] =
        useState({
            width: 0,
            height: 0,
        });

    const pdfContainerRef =
        useRef<HTMLDivElement>(null);

    const [pdfDocument, setPdfDocument] =
        useState<Document | null>(null);

    const [savedSignatures, setSavedSignatures] =
        useState<Signature[]>([]);

    const [publicLink, setPublicLink] =
        useState("");

    const [recipientEmail,
        setRecipientEmail] =
        useState("");

    const [sendingEmail,
        setSendingEmail] =
        useState(false);

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const [draftSignature, setDraftSignature] =
        useState<DraftSignature | null>(
            null
        );

    const [availableSignatures, setAvailableSignatures] =
        useState<string[]>([]);

    const [
        selectedSignatureId,
        setSelectedSignatureId,
    ] = useState<string | null>(
        null
    );

    const [
        auditLogs,
        setAuditLogs
    ] = useState<any[]>([]);

    const actionLabels = {
        DOCUMENT_UPLOADED:
            "📄 Document Uploaded",

        PUBLIC_LINK_GENERATED:
            "🔗 Public Link Generated",

        INVITATION_SENT:
            "📧 Invitation Sent",

        PUBLIC_SIGNATURE_ADDED:
            "✍️ Public Signature Added",
    };

    useEffect(() => {
        if (!id) return;

        const loadData = async () => {
            try {
                const documentData =
                    await getDocumentById(id);

                setPdfDocument(
                    documentData.document
                );

                const signatureData =
                    await getSignatures(id);

                setSavedSignatures(
                    signatureData.signatures || []
                );

                const auditData =
                    await getAuditLogs(id);

                setAuditLogs(
                    auditData.logs || []
                );

            } catch (error) {
                console.error(error);
            }
        };

        loadData();
    }, [id]);


    useEffect(() => {
        const timer = setTimeout(() => {

            const page =
                window.document.querySelector(
                    ".react-pdf__Page"
                ) as HTMLElement;

            if (!page) return;

            const rect =
                page.getBoundingClientRect();

            setPdfSize({
                width: rect.width,
                height: rect.height,
            });

        }, 1000);

        return () =>
            clearTimeout(timer);

    }, [savedSignatures]);

    const handleSaveSignature =
        async () => {
            if (!draftSignature) return;

            const signatureElement =
                document.getElementById(
                    "draft-signature"
                );

            const pdfPage =
                document.querySelector(
                    ".react-pdf__Page"
                ) as HTMLElement;

            if (
                !signatureElement ||
                !pdfPage
            ) {
                return;
            }

            const signatureRect =
                signatureElement.getBoundingClientRect();

            const pageRect =
                pdfPage.getBoundingClientRect();

            const relativeX =
                signatureRect.left -
                pageRect.left;

            const relativeY =
                signatureRect.top -
                pageRect.top;

            const xPercent =
                (relativeX /
                    pageRect.width) *
                100;

            const yPercent =
                (relativeY /
                    pageRect.height) *
                100;



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

                setSavedSignatures(
                    signatureData.signatures || []
                );

                setDraftSignature(null);
            } catch (error) {
                console.error(error);
            }
        };

    if (!pdfDocument) {
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

    const handleFinalizeDocument =
        async () => {
            try {
                await finalizeDocument(id);

                const documentData =
                    await getDocumentById(id);

                setPdfDocument(
                    documentData.document
                );

                alert(
                    "Signed PDF generated successfully"
                );
            } catch (error) {
                console.error(error);
            }
        };

    const handleGeneratePublicLink =
        async () => {
            try {

                const data =
                    await generatePublicLink(
                        id
                    );

                setPublicLink(
                    data.publicLink
                );

            } catch (error) {
                console.error(error);
            }
        };

    const handleSendInvitation =
        async () => {

            if (!recipientEmail) {
                alert(
                    "Please enter email"
                );
                return;
            }

            try {

                setSendingEmail(true);

                const response =
                    await sendInvitation(
                        id,
                        recipientEmail
                    );

                alert(
                    response.message
                );

                setRecipientEmail("");

            } catch (error) {

                console.error(error);

                alert(
                    "Failed to send invitation"
                );

            } finally {

                setSendingEmail(false);

            }
        };

    const pdfUrl =
        `http://localhost:5000/${pdfDocument.filePath.replace(
            /\\/g,
            "/"
        )}`;

    const pdfPage =
        window.document.querySelector(
            ".react-pdf__Page"
        ) as HTMLElement;

    let pageOffsetX = 0;
    let pageOffsetY = 0;

    if (pdfPage && pdfContainerRef.current) {
        const pageRect =
            pdfPage.getBoundingClientRect();

        const containerRect =
            pdfContainerRef.current.getBoundingClientRect();

        pageOffsetX =
            pageRect.left - containerRect.left;

        pageOffsetY =
            pageRect.top - containerRect.top;

    }

    const handleDownloadSignedPdf =
        async () => {
            try {
                const blob =
                    await downloadSignedPdf(
                        id
                    );

                const url =
                    window.URL.createObjectURL(
                        blob
                    );

                const link =
                    document.createElement(
                        "a"
                    );

                link.href = url;

                link.download =
                    "signed-document.pdf";

                document.body.appendChild(
                    link
                );

                link.click();

                link.remove();

                window.URL.revokeObjectURL(
                    url
                );
            } catch (error) {
                console.error(error);
            }
        };

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
                    <div className="mt-3">
                        <span
                            className={`rounded-full px-3 py-1 text-sm font-medium ${pdfDocument.status ===
                                "signed"
                                ? "bg-green-100 text-green-700"
                                : pdfDocument.status ===
                                    "rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}
                        >
                            {pdfDocument.status
                                .charAt(0)
                                .toUpperCase() +
                                pdfDocument.status.slice(
                                    1
                                )}
                        </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                        Review and sign your
                        document.
                    </p>
                </div>

                {/* Toolbar */}
                <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
                    <SignatureToolbar
                        onAddSignature={() =>
                            setIsModalOpen(true)
                        }
                    />

                    <div className="mt-4 flex gap-3 flex-wrap">
                        {availableSignatures.map(
                            (signature, index) => (
                                <div
                                    key={index}
                                    draggable
                                    onDragStart={(e) => {
                                        e.dataTransfer.setData(
                                            "signature",
                                            signature
                                        );
                                    }}
                                    className="
                                        cursor-grab
                                        rounded-lg
                                        border
                                        bg-white
                                        px-4
                                        py-2
                                        shadow-sm
                                        italic
                                        text-lg
                                        "
                                >
                                    {signature}
                                </div>
                            )
                        )}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">

                        {draftSignature && (
                            <button
                                onClick={
                                    handleSaveSignature
                                }
                                className="
                                    rounded-lg
                                    bg-green-600
                                    px-4
                                    py-2
                                    text-white
                                    hover:bg-green-700
                                "
                            >
                                Save Signature
                            </button>
                        )}

                        <button
                            onClick={
                                handleFinalizeDocument
                            }
                            className="
                                rounded-lg
                                bg-blue-600
                                px-4
                                py-2
                                text-white
                                hover:bg-blue-700
                            "
                        >
                            Finalize Document
                        </button>

                        {pdfDocument?.signedFilePath && (
                            <button
                                onClick={
                                    handleDownloadSignedPdf
                                }
                                className="
                                    rounded-lg
                                    bg-purple-600
                                    px-4
                                    py-2
                                    text-white
                                    hover:bg-purple-700
                                "
                            >
                                Download Signed PDF
                            </button>
                        )}

                        <button
                            onClick={
                                handleGeneratePublicLink
                            }
                            className="
                                rounded-lg
                                bg-orange-600
                                px-4
                                py-2
                                text-white
                            "
                        >
                            Generate Public Link
                        </button>

                        {publicLink && (
                            <div className="mt-4 rounded-lg border p-4">

                                <p className="mb-2 font-medium">
                                    Public Signing Link
                                </p>

                                <input
                                    readOnly
                                    value={publicLink}
                                    className="
                                        w-full
                                        rounded-md
                                        border
                                        p-2
                                    "
                                />

                                <button
                                    onClick={async () => {
                                        await navigator.clipboard.writeText(
                                            publicLink
                                        );

                                        alert(
                                            "Link copied successfully"
                                        );
                                    }}
                                    className="
                                        mt-3
                                        rounded-lg
                                        bg-blue-600
                                        px-4
                                        py-2
                                        text-white
                                    "
                                >
                                    Copy Link
                                </button>

                            </div>
                        )}

                        <div className="mt-4">

                            <label
                                className="
                                    mb-2
                                    block
                                    font-medium
                                "
                            >
                                Recipient Email
                            </label>

                            <input
                                type="email"
                                value={recipientEmail}
                                onChange={(e) =>
                                    setRecipientEmail(
                                        e.target.value
                                    )
                                }
                                placeholder="john@gmail.com"
                                className="
                                    w-full
                                    rounded-lg
                                    border
                                    p-2
                                "
                            />

                            <button
                                onClick={
                                    handleSendInvitation
                                }
                                disabled={sendingEmail}
                                className="
                                    mt-3
                                    rounded-lg
                                    bg-blue-600
                                    px-4
                                    py-2
                                    text-white
                                "
                            >
                                {sendingEmail
                                    ? "Sending..."
                                    : "Send Invitation"}
                            </button>

                        </div>

                    </div>
                </div>

                {/* PDF */}
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <div
                        ref={pdfContainerRef}
                        className="relative overflow-auto rounded-lg border border-slate-200 bg-slate-100 p-4"

                        onDragOver={(e) => {
                            e.preventDefault();
                        }}

                        onDrop={(e) => {
                            e.preventDefault();

                            const signature =
                                e.dataTransfer.getData(
                                    "signature"
                                );

                            const rect =
                                e.currentTarget.getBoundingClientRect();

                            const x =
                                e.clientX - rect.left;

                            const y =
                                e.clientY - rect.top;

                            setDraftSignature({
                                text: signature,
                                x,
                                y,
                            });
                        }}
                    >
                        <PdfViewer
                            fileUrl={pdfUrl}
                        />

                        <div
                            className="
                                absolute
                                inset-0
                                z-50
                            
                            
                            "
                        >

                            {draftSignature && (

                                <SignatureOverlay
                                    text={
                                        draftSignature.text
                                    }
                                    x={
                                        draftSignature.x
                                    }
                                    y={
                                        draftSignature.y
                                    }
                                    draggable
                                    onDragStop={(
                                        x,
                                        y
                                    ) => {
                                        setDraftSignature({
                                            ...draftSignature,
                                            x,
                                            y,
                                        });
                                    }}
                                />


                            )}

                            {savedSignatures.map(
                                (
                                    signature: Signature,
                                    index
                                ) => {

                                    const renderX =
                                        (signature.xPercent / 100) *
                                        pdfSize.width;

                                    const renderY =
                                        (signature.yPercent / 100) *
                                        pdfSize.height;

                                    const finalX =
                                        pageOffsetX + renderX;

                                    const finalY =
                                        pageOffsetY + renderY;




                                    return (
                                        <SignatureOverlay
                                            key={signature._id}
                                            text={signature.signatureText}
                                            x={finalX}
                                            y={finalY}
                                            fontSize={signature.fontSize}
                                            selected={
                                                selectedSignatureId ===
                                                signature._id
                                            }
                                            onSelect={() =>
                                                setSelectedSignatureId(
                                                    signature._id
                                                )
                                            }
                                            onDelete={async () => {
                                                const confirmed =
                                                    window.confirm(
                                                        "Delete this signature?"
                                                    );

                                                if (!confirmed) return;

                                                try {
                                                    await deleteSignature(
                                                        signature._id
                                                    );

                                                    const signatureData =
                                                        await getSignatures(id);

                                                    setSavedSignatures(
                                                        signatureData.signatures
                                                    );

                                                    setSelectedSignatureId(
                                                        null
                                                    );
                                                } catch (error) {
                                                    console.error(error);
                                                }
                                            }}

                                            onIncreaseSize={async () => {
                                                try {
                                                    await resizeSignature(
                                                        signature._id,
                                                        signature.fontSize + 4
                                                    );

                                                    const signatureData =
                                                        await getSignatures(id);

                                                    setSavedSignatures(
                                                        signatureData.signatures
                                                    );
                                                } catch (error) {
                                                    console.error(error);
                                                }
                                            }}

                                            onDecreaseSize={async () => {
                                                try {
                                                    const newSize =
                                                        Math.max(
                                                            20,
                                                            signature.fontSize - 4
                                                        );

                                                    await resizeSignature(
                                                        signature._id,
                                                        newSize
                                                    );

                                                    const signatureData =
                                                        await getSignatures(id);

                                                    setSavedSignatures(
                                                        signatureData.signatures
                                                    );
                                                } catch (error) {
                                                    console.error(error);
                                                }
                                            }}
                                        />
                                    );
                                }
                            )}

                        </div>
                    </div>
                </div>

                <TypedSignatureModal
                    isOpen={
                        isModalOpen
                    }
                    onClose={() =>
                        setIsModalOpen(false)
                    }
                    onSave={(
                        signature
                    ) => {
                        setAvailableSignatures((prev) => [
                            ...prev,
                            signature
                        ]);

                        setIsModalOpen(false);
                    }}
                />

                <div className="mt-8 rounded-xl bg-white p-4 shadow-sm">

                    <h2 className="mb-4 text-lg font-semibold">
                        Audit Trail
                    </h2>

                    {auditLogs.map((log) => (

                        <div
                            key={log._id}
                            className="
                                border-l-2
                                border-gray-300
                                pl-4
                                py-3
                            "
                        >

                            <p>
                                {
                                    actionLabels[
                                    log.action as keyof typeof actionLabels
                                    ] || log.action
                                }
                            </p>

                            {log.action === "INVITATION_SENT" && (
                                <p className="text-sm text-blue-600">
                                    Sent to: {log.details}
                                </p>
                            )}

                            {log.action === "PUBLIC_SIGNATURE_ADDED" && (
                                <p className="text-sm text-green-600">
                                    Signed by: {log.details}
                                </p>
                            )}


                            <p className="text-sm text-gray-500">
                                {new Date(
                                    log.createdAt
                                ).toLocaleString()}
                            </p>

                        </div>

                    ))}

                </div>
            </div>
        </DashboardLayout>
    );
}