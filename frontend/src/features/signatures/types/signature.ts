export interface Signature {
  _id: string;

  documentId: string;

  page: number;

  xPercent: number;
  yPercent: number;

  fontSize: number;

  signatureType: "typed";

  signatureText: string;

  signerName?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface DraftSignature {
  text: string;
  x: number;
  y: number;
}