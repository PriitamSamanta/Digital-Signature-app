import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware";

import {
  createSignature,
  getDocumentSignatures,
  deleteSignature,
  resizeSignature,
} from "../controllers/signatureController";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createSignature
);

router.get(
  "/:documentId",
  authMiddleware,
  getDocumentSignatures
);

router.delete(
  "/:id",
  authMiddleware,
  deleteSignature
);

router.patch(
  "/:id/resize",
  authMiddleware,
  resizeSignature
);

export default router;