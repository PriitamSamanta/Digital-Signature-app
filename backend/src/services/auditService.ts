import AuditLog from
  "../models/AuditLog";

export const createAuditLog =
  async (
    documentId: string,
    action: string,
    performedBy?: string,
    details?: string
  ) => {

    await AuditLog.create({
      documentId,
      action,
      performedBy,
      details,
    });

  };