import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";

import {
    uploadDocument,
    getDocuments,
    getDocumentById,
    updateDocumentStatus,
    finalizeDocument,
    downloadSignedPdf,
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

router.post(
    "/:id/finalize",
    authMiddleware,
    finalizeDocument
);

router.get(
  "/:id/download-signed",
  authMiddleware,
  downloadSignedPdf
);

export default router;