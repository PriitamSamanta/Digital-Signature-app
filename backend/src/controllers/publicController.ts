import { Response, Request } from "express";

import Signature from "../models/Signature";
import Document from "../models/Document";

export const getPublicDocument =
    async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const document =
                await Document.findOne({
                    publicToken:
                        req.params.token,
                    publicSigningEnabled:
                        true,
                });

            if (!document) {
                res.status(404).json({
                    success: false,
                    message:
                        "Invalid signing link",
                });
                return;
            }

            res.status(200).json({
                success: true,
                document,
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Server Error",
            });
        }
    };


export const createPublicSignature =
    async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const {
                page,
                xPercent,
                yPercent,
                signatureType,
                signatureText,
            } = req.body;

            const document =
                await Document.findOne({
                    publicToken:
                        req.params.token,
                    publicSigningEnabled:
                        true,
                });

            if (!document) {
                res.status(404).json({
                    success: false,
                    message:
                        "Invalid signing link",
                });
                return;
            }

            const signature =
                await Signature.create({
                    documentId:
                        document._id,

                    signerId: null,

                    page,

                    xPercent,
                    yPercent,

                    signatureType,

                    signatureText,

                    status: "signed",
                });

            res.status(201).json({
                success: true,
                signature,
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Server Error",
            });
        }
    };


export const getPublicSignatures =
    async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const document =
                await Document.findOne({
                    publicToken:
                        req.params.token,
                    publicSigningEnabled:
                        true,
                });

            if (!document) {
                res.status(404).json({
                    success: false,
                    message:
                        "Invalid signing link",
                });
                return;
            }

            const signatures =
                await Signature.find({
                    documentId:
                        document._id,
                }).sort({
                    createdAt: -1,
                });

            res.status(200).json({
                success: true,
                count:
                    signatures.length,
                signatures,
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Server Error",
            });
        }
    };