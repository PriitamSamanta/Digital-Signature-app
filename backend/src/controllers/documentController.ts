import { Response } from "express";

import { AuthRequest } from "../types/auth";
import Document from "../models/Document";

export const uploadDocument = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
      return;
    }

    const document = await Document.create({
      title: req.file.originalname,
      originalFileName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      ownerId: req.userId,
    });

    res.status(201).json({
      success: true,
      document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const getDocuments = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const documents = await Document.find({
      ownerId: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: documents.length,
      documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getDocumentById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      ownerId: req.userId,
    });

    if (!document) {
      res.status(404).json({
        success: false,
        message: "Document not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};