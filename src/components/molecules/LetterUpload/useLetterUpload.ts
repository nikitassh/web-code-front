import { Upload, type UploadProps } from "antd";
import * as pdfjsLib from "pdfjs-dist";
import type { TextItem } from "pdfjs-dist/types/src/display/api";

type UseLetterUploadProps = {
  setText: React.Dispatch<React.SetStateAction<string>>;
};

export const useLetterUpload = ({ setText }: UseLetterUploadProps) => {
  const extractTextFromPDF = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .filter((item): item is TextItem => "str" in item)
        .map((item) => item.str)
        .join(" ");
      fullText += pageText + "\n";
    }

    setText(fullText);
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".pdf",
    beforeUpload: (file) => {
      const isPDF = file.type === "application/pdf";

      if (!isPDF) {
        return Upload.LIST_IGNORE;
      }
      extractTextFromPDF(file);

      return false;
    },
    onDrop(e) {
      const file = e.dataTransfer.files[0];
      if (file && file.type === "application/pdf") {
        extractTextFromPDF(file);

        return;
      }
    },
  };

  return { props };
};
