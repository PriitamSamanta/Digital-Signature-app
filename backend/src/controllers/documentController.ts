import { Response, Request } from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import Signature from "../models/Signature";
import AuditLog from "../models/AuditLog";

import { AuthRequest } from "../types/auth";
import Document from "../models/Document";
import { sendSigningEmail } from "../services/emailService";
import { createAuditLog } from "../services/auditService";

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
      status: "pending",
    });

    await createAuditLog(
      document._id.toString(),
      "DOCUMENT_UPLOADED",
      req.userId
    );

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

export const updateDocumentStatus = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.body;

    const document =
      await Document.findOne({
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

    document.status = status;

    await document.save();

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

export const finalizeDocument = async (
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

    const signatures =
      await Signature.find({
        documentId: document._id,
      });

    const pdfBytes =
      fs.readFileSync(
        document.filePath
      );

    const pdfDoc =
      await PDFDocument.load(
        pdfBytes
      );

    const page =
      pdfDoc.getPages()[0];

    const {
      width,
      height,
    } = page.getSize();

    const font =
      await pdfDoc.embedFont(
        StandardFonts.HelveticaOblique
      );

    for (const signature of signatures) {
      const x =
        (signature.xPercent /
          100) *
        width;

      const y =
        height -
        (signature.yPercent /
          100) *
        height;

      page.drawText(
        signature.signatureText ||
        "",
        {
          x,
          y,
          size:
            signature.fontSize ||
            48,
          font,
        }
      );
    }

    const signedPdfBytes =
      await pdfDoc.save();

    const signedDir =
      path.join(
        process.cwd(),
        "uploads",
        "signed"
      );

    if (
      !fs.existsSync(
        signedDir
      )
    ) {
      fs.mkdirSync(
        signedDir,
        {
          recursive: true,
        }
      );
    }

    const signedFileName =
      `signed-${Date.now()}.pdf`;

    const signedFilePath =
      path.join(
        signedDir,
        signedFileName
      );

    fs.writeFileSync(
      signedFilePath,
      signedPdfBytes
    );

    document.signedFilePath =
      signedFilePath;

    await document.save();

    res.status(200).json({
      success: true,
      signedFilePath,
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

export const downloadSignedPdf = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const document =
      await Document.findOne({
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

    if (!document.signedFilePath) {
      res.status(404).json({
        success: false,
        message:
          "Signed PDF not generated yet",
      });
      return;
    }

    res.download(
      document.signedFilePath
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const generatePublicLink =
  async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const document =
        await Document.findOne({
          _id: req.params.id,
          ownerId: req.userId,
        });

      if (!document) {
        res.status(404).json({
          success: false,
          message:
            "Document not found",
        });
        return;
      }

      const token =
        uuidv4();

      document.publicToken =
        token;

      document.publicSigningEnabled =
        true;

      await document.save();

      await createAuditLog(
        document._id.toString(),
        "PUBLIC_LINK_GENERATED",
        req.userId
      );

      res.status(200).json({
        success: true,
        publicLink:
          `http://localhost:3000/sign/${token}`,
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


export const sendInvitation =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    const {
      email
    } = req.body;

    const document =
      await Document.findOne({
        _id: req.params.id,
        ownerId: req.userId,
      });

    if (!document) {
      return res.status(404).json({
        success: false,
      });
    }

    const signingLink =
      `http://localhost:3000/sign/${document.publicToken}`;

    await sendSigningEmail(
      email,
      signingLink
    );

    await createAuditLog(
      document._id.toString(),
      "INVITATION_SENT",
      req.userId,
      email
    );

    res.status(200).json({
      success: true,
      message:
        "Invitation sent",
    });
  };

export const getAuditLogs = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {

    const logs =
      await AuditLog.find({
        documentId:
          req.params.id,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: logs.length,
      logs,
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

