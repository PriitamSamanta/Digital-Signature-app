import api from "@/services/api";

export const getDocuments = async () => {
  const response = await api.get("/docs");

  return response.data;
};

export const uploadDocument = async (
  file: File
) => {
  const formData = new FormData();

  formData.append("document", file);

  const response = await api.post(
    "/docs/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};


export const getDocumentById = async (
  id: string
) => {
  const response = await api.get(
    `/docs/${id}`
  );

  return response.data;
};

export const finalizeDocument =
  async (
    documentId: string
  ) => {
    const response =
      await api.post(
        `/docs/${documentId}/finalize`
      );

    return response.data;
  };


export const downloadSignedPdf =
  async (
    documentId: string
  ) => {
    const response =
      await api.get(
        `/docs/${documentId}/download-signed`,
        {
          responseType: "blob",
        }
      );

    return response.data;
  };

export const generatePublicLink =
  async (
    documentId: string
  ) => {
    const response =
      await api.post(
        `/docs/${documentId}/generate-link`
      );

    return response.data;
  };