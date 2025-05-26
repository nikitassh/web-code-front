import { AnimatedSegmented, Button } from "@/components/atoms";
import { LetterTextarea } from "@/components/molecules/LetterTextarea";
import { LetterUpload } from "@/components/molecules/LetterUpload";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { useVideoGenerate } from "@/shared/api/hooks/video/useVideoGenerate";
import { generateUUID } from "@/shared/utils/uuid";
import s from "./LetterForm.module.scss";

export const LetterForm: React.FC = () => {
  const { t } = useTranslation();

  const [text, setText] = React.useState<string>("");

  const [isText, setIsText] = React.useState<boolean>(true);

  const generateVideoMutation = useVideoGenerate();

  const onSubmit = React.useCallback(() => {
    generateVideoMutation.mutate({
      text,
      uuid: generateUUID(),
    });
  }, [generateVideoMutation, text]);

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
            onClick={onSubmit}
            loading={generateVideoMutation.isLoading}
            disabled={generateVideoMutation.isLoading}
          >
            {t("uploadLetter")}
          </Button>
        </div>
      </div>
    </div>
  );
};
