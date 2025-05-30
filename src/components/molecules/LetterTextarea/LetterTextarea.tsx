import { Input } from "antd";
import * as React from "react";

import { useTranslation } from "react-i18next";

import s from "./LetterTextarea.module.scss";

type LetterTextareaProps = {
  setText: React.Dispatch<React.SetStateAction<string>>;
};

export const LetterTextarea: React.FC<LetterTextareaProps> = ({ setText }) => {
  const { t } = useTranslation();

  const onChange = React.useCallback<
    React.ChangeEventHandler<HTMLTextAreaElement>
  >(
    (event) => {
      setText(event.target.value);
    },
    [setText]
  );

  return (
    <Input.TextArea
      className={s.textarea}
      showCount
      maxLength={1000}
      onChange={onChange}
      placeholder={t("textLetter")}
    />
  );
};
