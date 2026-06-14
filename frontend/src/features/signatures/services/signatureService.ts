import api from "@/services/api";
import { GetSignaturesResponse } from "../types/signatureResponse";

export const createSignature = async (
  payload: {
    documentId: string;
    page: number;

    xPercent: number;
    yPercent: number;

    signatureType: "typed";

    signatureText: string;
  }
) => {
  const response = await api.post(
    "/signatures",
    payload
  );

  return response.data;
};

export const getSignatures = async (
  documentId: string
): Promise<GetSignaturesResponse> => {
  const response = await api.get(
    `/signatures/${documentId}`
  );

  return response.data;
};

export const deleteSignature = async (
  signatureId: string
) => {
  const response =
    await api.delete(
      `/signatures/${signatureId}`
    );

  return response.data;
};
