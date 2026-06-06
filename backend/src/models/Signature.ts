import mongoose, {
  Schema,
  Document as MDocument,
} from "mongoose";

export interface ISignature extends MDocument {
  documentId: mongoose.Types.ObjectId;
  signerId: mongoose.Types.ObjectId;

  page: number;

  xPercent: number;
  yPercent: number;

  signatureType: "typed" | "drawn";

  signatureText?: string;

  signatureImage?: string;

  status: string;
}

const signatureSchema = new Schema<ISignature>(
  {
    documentId: {
      type: Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    signerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    page: {
      type: Number,
      required: true,
    },

    xPercent: {
      type: Number,
      required: true,
    },

    yPercent: {
      type: Number,
      required: true,
    },
    signatureType: {
      type: String,
      enum: ["typed", "drawn"],
      required: true,
    },

    signatureText: {
      type: String,
    },

    signatureImage: {
      type: String,
    },

    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISignature>(
  "Signature",
  signatureSchema
);