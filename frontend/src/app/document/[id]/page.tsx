"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getDocumentById } from "@/features/documents/services/documentService";
import dynamic from "next/dynamic";
import SignatureToolbar from "@/features/signatures/components/SignatureToolbar";
import SignatureOverlay from "@/features/signatures/components/SignatureOverlay";

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

    const [
        signatureText,
        setSignatureText,
    ] = useState("");
    const params = useParams();

    const [position, setPosition] =
        useState({
            x: 200,
            y: 200,
        });

    const id = params.id as string;


    const [document, setDocument] =
        useState<any>(null);



    useEffect(() => {
        if (!id) return;

        const fetchDocument =
            async () => {
                try {
                    const data =
                        await getDocumentById(id);

                    setDocument(
                        data.document
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

    return (
        <div
            className="relative"
            onClick={(e) => {
                const rect =
                    e.currentTarget.getBoundingClientRect();

                setPosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }}
        >
            <h1>{document.title}</h1>

            <PdfViewer fileUrl={pdfUrl} />
            <SignatureToolbar
                onAddSignature={() => {
                    const text =
                        prompt(
                            "Enter Signature"
                        );

                    if (text) {
                        setSignatureText(text);
                    }
                }}
            />

            {signatureText && (
                <SignatureOverlay
                    text={signatureText}
                    x={position.x}
                    y={position.y}
                />
            )}
        </div>
    );
}