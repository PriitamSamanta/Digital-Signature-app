import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";

import {
    uploadDocument,
    getDocuments,
    getDocumentById,
    updateDocumentStatus,
} from "../controllers/documentController";

const router = Router();

router.post(
    "/upload",
    authMiddleware,
    upload.single("document"),
    uploadDocument
);

router.get(
    "/",
    authMiddleware,
    getDocuments
);

router.get(
    "/:id",
    authMiddleware,
    getDocumentById
);

router.patch(
    "/:id/status",
    authMiddleware,
    updateDocumentStatus
);

export default router;