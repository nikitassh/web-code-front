import { Upload } from "antd";
import * as pdfjsLib from "pdfjs-dist";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useLetterUpload } from "./useLetterUpload";

import s from "./LetterUpload.module.scss";

if (typeof window !== "undefined" && "Worker" in window) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

type LetterUploadProps = {
  setText: React.Dispatch<React.SetStateAction<string>>;
};

export const LetterUpload: React.FC<LetterUploadProps> = ({ setText }) => {
  const { t } = useTranslation();

  const { props } = useLetterUpload({ setText });

  return (
    <Upload.Dragger {...props} className={s.upload}>
      <p>{/* <InboxOutlined /> */}</p>
      <p>{t("upload.clickOrDrag")}</p>
      <p>{t("upload.hint")}</p>
    </Upload.Dragger>
  );
};
