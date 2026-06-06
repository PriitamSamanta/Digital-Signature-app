"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getDocuments } from "../services/documentService";

export default function DocumentsList() {
    const [documents, setDocuments] =
        useState([]);

    useEffect(() => {
        const fetchDocuments =
            async () => {
                const data =
                    await getDocuments();

                setDocuments(
                    data.documents
                );
            };

        fetchDocuments();
    }, []);

    return (
        <div>
            {documents.map(
                (doc: any) => (
                    <div key={doc._id}>
                        <h3>{doc.title}</h3>
                        
                        <Link
                            href={`/document/${doc._id}`}
                        >
                            Open
                        </Link>
                    </div>
                )
            )}
        </div>
    );
}