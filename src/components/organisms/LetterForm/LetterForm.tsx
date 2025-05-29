import { AnimatedSegmented, Button } from "@/components/atoms";
import { LetterTextarea } from "@/components/molecules/LetterTextarea";
import { LetterUpload } from "@/components/molecules/LetterUpload";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { ModalAI } from "@/components/modals";
import s from "./LetterForm.module.scss";

export const LetterForm: React.FC = () => {
  const { t } = useTranslation();

  const [text, setText] = React.useState<string>("");

  const [isText, setIsText] = React.useState<boolean>(true);

  const [modalOpened, setModalOpened] = React.useState<boolean>(false);

  return (
    <div>
      <AnimatedSegmented
        options={[
          { value: "text", label: t("text") },
          { value: "pdf", label: t("pdf") },
        ]}
        value={isText ? "text" : "pdf"}
        onChange={(value: string) => setIsText(Boolean(value === "text"))}
      />
      <div className={s.form}>
        <div className={s.form__inner}>
          {isText ? (
            <LetterTextarea setText={setText} />
          ) : (
            <LetterUpload setText={setText} />
          )}
          <Button
            variant="solid"
            color="orange"
            onClick={() => setModalOpened(true)}
          >
            {t("uploadLetter")}
          </Button>
        </div>
      </div>

      <ModalAI
        letterText={text}
        open={modalOpened}
        closeModal={() => setModalOpened(false)}
        centered
      />
    </div>
  );
};
