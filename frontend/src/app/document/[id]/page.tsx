"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getDocumentById } from "@/features/documents/services/documentService";
import dynamic from "next/dynamic";

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
        <div>
            <h1>{document.title}</h1>

            <PdfViewer fileUrl={pdfUrl} />
        </div>
    );
}