import { Router } from "express";
import {
    getPublicDocument,
    createPublicSignature,
    getPublicSignatures,
} from "../controllers/publicController";

const router = Router();



router.post(
  "/sign/:token/signature",
  createPublicSignature
);

router.get(
  "/sign/:token/signatures",
  getPublicSignatures
);

router.get(
  "/sign/:token",
  getPublicDocument
);

export default router;