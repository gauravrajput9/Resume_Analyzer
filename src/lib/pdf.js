import pdf from "pdf-parse";

export const extractTextFromPDF = async (buffer) => {
  if (!Buffer.isBuffer(buffer)) {
    throw new Error("Input must be a Buffer");
  }

  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error("Extract pdf error:", error);
    throw error;
  }
};