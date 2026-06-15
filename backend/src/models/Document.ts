import mongoose, { Schema, Document as MDocument } from "mongoose";

export interface IDocument extends MDocument {
  title: string;
  originalFileName: string;
  filePath: string;
  fileSize: number;
  ownerId: mongoose.Types.ObjectId;
  status: string;
  signedFilePath?: string;
}

const documentSchema = new Schema<IDocument>(
  {
    title: {
      type: String,
      required: true,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    signedFilePath: {
      type: String,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "pending", "signed", "rejected"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDocument>(
  "Document",
  documentSchema
);