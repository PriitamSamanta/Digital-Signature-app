export interface Signature {
  _id: string;

  documentId: string;

  page: number;

  xPercent: number;
  yPercent: number;

  signatureType: "typed";

  signatureText: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface DraftSignature {
  text: string;
  x: number;
  y: number;
}