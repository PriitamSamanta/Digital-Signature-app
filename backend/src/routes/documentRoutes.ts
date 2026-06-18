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
    generatePublicLink,
    sendInvitation,
    getAuditLogs,
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
  "/:id/audit",
  authMiddleware,
  getAuditLogs
);

router.get(
  "/:id",
  authMiddleware,
  getDocumentById
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

router.post(
  "/:id/generate-link",
  authMiddleware,
  generatePublicLink
);

router.post(
  "/:id/send-invitation",
  authMiddleware,
  sendInvitation
);

export default router;