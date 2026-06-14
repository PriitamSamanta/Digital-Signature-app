import { Response } from "express";

import Signature from "../models/Signature";
import { AuthRequest } from "../types/auth";
import Document from "../models/Document";

export const createSignature = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      documentId,
      page,
      xPercent,
      yPercent,
      signatureType,
      signatureText,
      signatureImage,
    } = req.body;



    const signature = await Signature.create({
      documentId,
      signerId: req.userId,

      page,

      xPercent,
      yPercent,

      signatureType,

      signatureText,
      signatureImage,

      status: "pending",
    });

    await Document.findByIdAndUpdate(
      documentId,
      {
        status: "signed",
      }
    );

    res.status(201).json({
      success: true,
      signature,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getDocumentSignatures = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { documentId } = req.params;

    const signatures = await Signature.find({
      documentId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: signatures.length,
      signatures,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const deleteSignature = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const signature =
      await Signature.findById(id);

    if (!signature) {
      res.status(404).json({
        success: false,
        message: "Signature not found",
      });
      return;
    }

    if (
      signature.signerId.toString() !==
      req.userId
    ) {
      res.status(403).json({
        success: false,
        message:
          "You can only delete your own signature",
      });
      return;
    }

    await Signature.findByIdAndDelete(
      id
    );

    res.status(200).json({
      success: true,
      message:
        "Signature deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};