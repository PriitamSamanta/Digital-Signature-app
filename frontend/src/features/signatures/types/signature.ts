export interface Signature {
  documentId: string;

  page: number;

  xPercent: number;
  yPercent: number;

  signatureType: "typed" | "drawn";

  signatureText?: string;

  signatureImage?: string;
}