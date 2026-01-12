import { PDFParse } from "pdf-parse";

export const extractTextFromPDF = async (buffer) => {
  if (!Buffer.isBuffer(buffer)) {
    throw new Error("Input must be a Buffer");
  }

  try {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    await parser.destroy(); 
    return result.text;
  } catch (error) {
    console.error("Extract pdf error: ", error);
    throw error;
  }
};