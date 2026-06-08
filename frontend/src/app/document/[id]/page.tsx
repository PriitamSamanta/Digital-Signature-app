"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

import { getDocumentById } from "@/features/documents/services/documentService";
import SignatureToolbar from "@/features/signatures/components/SignatureToolbar";
import SignatureOverlay from "@/features/signatures/components/SignatureOverlay";
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
        return <p>Loading...</p>;
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

    console.log(
        "LATEST SIGNATURE",
        latestSignature
    );

    const containerWidth =
        pdfContainerRef.current?.clientWidth || 0;

    const containerHeight =
        pdfContainerRef.current?.clientHeight || 0;

    return (
        <div className="p-4">
            <h1 className="mb-4 text-xl font-bold">
                {document.title}
            </h1>

            <SignatureToolbar
                onAddSignature={() => {
                    const text = prompt(
                        "Enter Signature"
                    );

                    if (!text) return;

                    setSignatureText(text);

                    setIsPlacingSignature(true);

                    alert(
                        "Now click on the PDF where you want to place the signature."
                    );
                }}
            />

            <div
                ref={pdfContainerRef}
                className="relative mt-4"
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

                    console.log(
                        "CLICK POSITION",
                        newPosition
                    );

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
                        text={latestSignature.signatureText}
                        x={
                            (latestSignature.xPercent / 100) *
                            containerWidth
                        }
                        y={
                            (latestSignature.yPercent / 100) *
                            containerHeight
                        }
                    />
                )}
            </div>
        </div>
    );
}