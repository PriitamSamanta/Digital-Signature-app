import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware";

import {
  createSignature,
  getDocumentSignatures,
  deleteSignature,
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

export default router;