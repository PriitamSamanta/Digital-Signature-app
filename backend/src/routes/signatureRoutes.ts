import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware";

import {
  createSignature,
  getDocumentSignatures,
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

export default router;