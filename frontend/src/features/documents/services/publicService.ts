import api from "@/services/api";

export const getPublicDocument =
  async (token: string) => {
    console.log("DOCUMENT ROUTE");
    const response =
      await api.get(
        `/public/sign/${token}`
      );

    return response.data;
  };

export const getPublicSignatures =
  async (token: string) => {
    console.log("SIGNATURES ROUTE");
    const response =
      await api.get(
        `/public/sign/${token}/signatures`
      );

    return response.data;
  };

export const createPublicSignature =
  async (
    token: string,
    payload: {
      page: number;
      xPercent: number;
      yPercent: number;
      signatureType: "typed";
      signatureText: string;
      fontSize: number;
    }
  ) => {
    const response =
      await api.post(
        `/public/sign/${token}/signature`,
        payload
      );

    return response.data;
  };