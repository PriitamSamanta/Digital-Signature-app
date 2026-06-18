"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
    getPublicDocument,
    getPublicSignatures,
    createPublicSignature,
} from "@/features/documents/services/publicService";
import dynamic from "next/dynamic";
import { Document } from "@/features/documents/types/document";
import { Signature } from "@/features/signatures/types/signature";
import SignatureToolbar
    from "@/features/signatures/components/SignatureToolbar";

import TypedSignatureModal
    from "@/features/signatures/components/TypedSignatureModal";
import SignatureOverlay from "@/features/signatures/components/SignatureOverlay";


export default function PublicSignPage() {
    const params = useParams();

    const [pdfDocument, setPdfDocument] =
        useState<Document | null>(null);

    const [loading, setLoading] =
        useState(true);

    const PdfViewer = dynamic(
        () =>
            import(
                "@/features/documents/components/PdfViewer"
            ),
        {
            ssr: false,
        }
    );

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const [
        availableSignatures,
        setAvailableSignatures,
    ] = useState<string[]>([]);

    const [
        draftSignature,
        setDraftSignature,
    ] = useState<{
        text: string;
        x: number;
        y: number;
    } | null>(null);

    const [
        savedSignatures,
        setSavedSignatures,
    ] = useState<Signature[]>([]);

    const [pdfSize, setPdfSize] =
        useState({
            width: 0,
            height: 0,
        });

    const pdfContainerRef =
        useRef<HTMLDivElement>(null);





    useEffect(() => {
        const loadDocument =
            async () => {
                try {
                    const data =
                        await getPublicDocument(
                            params.token as string
                        );

                    setPdfDocument(
                        data.document
                    );

                    const signatureData =
                        await getPublicSignatures(
                            params.token as string
                        );

                    setSavedSignatures(
                        signatureData.signatures || []
                    );
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

        loadDocument();


    }, [params.token]);

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
                await createPublicSignature(params.token as string,
                    {
                        page: 1,
                        xPercent,
                        yPercent,
                        signatureType: "typed",
                        signatureText:
                            draftSignature.text,
                        fontSize: 48,
                    }
                );

                const signatureData =
                    await getPublicSignatures(
                        params.token as string
                    );

                setSavedSignatures(
                    signatureData.signatures
                );

                setDraftSignature(null);
            } catch (error) {
                console.error(error);
            }
        };

    if (loading || !pdfDocument) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }




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



    return (
        <div className="p-6">
            <h1>{pdfDocument.title}</h1>

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
                            mt-4
                            rounded-lg
                            bg-green-600
                            px-4
                            py-2
                            text-white
                        "
                    >
                        Save Signature
                    </button>
                )}
            </div>

            <div
                ref={pdfContainerRef}
                className="relative"
                onDragOver={(e) =>
                    e.preventDefault()
                }
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
                        (signature) => {

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
                                />
                            );
                        }
                    )}
                </div>


            </div>



            <TypedSignatureModal
                isOpen={isModalOpen}
                onClose={() =>
                    setIsModalOpen(false)
                }
                onSave={(signature) => {

                    setAvailableSignatures(
                        (prev) => [
                            ...prev,
                            signature,
                        ]
                    );

                    setIsModalOpen(false);
                }}
            />
        </div>
    );
}