import mongoose, {
  Schema,
  Document as MDocument,
} from "mongoose";

export interface IAuditLog
  extends MDocument {

  documentId:
    mongoose.Types.ObjectId;

  action: string;

  performedBy?: string;

  details?: string;
}

const auditLogSchema =
  new Schema(
    {
      documentId: {
        type:
          Schema.Types.ObjectId,
        ref: "Document",
        required: true,
      },

      action: {
        type: String,
        required: true,
      },

      performedBy: {
        type: String,
      },

      details: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "AuditLog",
  auditLogSchema
);