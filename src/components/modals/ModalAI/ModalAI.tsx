import { EditFilled, OpenAIFilled } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Radio,
  type ModalProps,
} from "antd";

import * as React from "react";

import { useModalAI } from "./useModalAI";

import { useVideoGenerate } from "@/shared/api/hooks/video/useVideoGenerate";
import { generateUUID } from "@/shared/utils/uuid";
import { useTranslation } from "react-i18next";
import s from "./ModalAI.module.scss";

type ModalAIProps = ModalProps & {
  closeModal: () => void;
  letterText: string;
};

export const ModalAI: React.FC<ModalAIProps> = ({
  letterText,
  closeModal,
  ...props
}) => {
  const {
    fetchAIPrompt,
    renderText,
    isLoading,
    isFinished,
    text,
    setText,
    parseJson,
  } = useModalAI(letterText);

  const [api, contextHolder] = notification.useNotification();
  const [isEditing, setIsEditing] = React.useState(false);
  const [form] = Form.useForm();

  const { t } = useTranslation();

  React.useEffect(() => {
    if (letterText && props.open) {
      fetchAIPrompt();
    }
  }, [fetchAIPrompt, letterText, props.open]);

  React.useEffect(() => {
    if (text && isFinished) {
      try {
        const json = parseJson(text);
        if (json) {
          form.setFieldsValue(json);
        }
      } catch {
        api.error({
          message: t("modal.generateError"),
          description: t("modal.generateErrorDescription"),
        });
      }
    }
  }, [text, isFinished, form, parseJson, t, api]);

  const generateVideoMutation = useVideoGenerate();

  const onSubmit = React.useCallback(() => {
    const values = form.getFieldsValue();
    generateVideoMutation.mutate({
      uuid: generateUUID(),
      ...values,
    });
  }, [form, generateVideoMutation]);

  const handleEdit = React.useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancel = React.useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleGenderChange = React.useCallback(
    (e: RadioChangeEvent) => {
      form.setFieldValue("gender", e.target.value);
    },
    [form]
  );

  return (
    <Modal
      {...props}
      title={
        isLoading ? (
          <Flex align="center" gap={8}>
            <OpenAIFilled className={s.modal__loader} />
            <h4>{t("modal.generatingScript")}</h4>
          </Flex>
        ) : (
          t("video.tabs.script")
        )
      }
      centered
      onCancel={() => {
        closeModal();
        setText("");
        setIsEditing(false);
      }}
      classNames={{
        body: s.modal__content,
      }}
      footer={
        <Flex justify="flex-end" gap={8}>
          {!isEditing ? (
            <Button
              icon={<EditFilled />}
              disabled={isLoading || !isFinished}
              onClick={handleEdit}
            >
              {t("modal.edit")}
            </Button>
          ) : (
            <Button onClick={handleCancel}>{t("modal.cancel")}</Button>
          )}
          <Button
            variant="solid"
            color="orange"
            disabled={isLoading || !isFinished}
            onClick={onSubmit}
          >
            {t("modal.upload")}
          </Button>
        </Flex>
      }
    >
      {!isEditing ? (
        <div
          style={{ whiteSpace: "pre-wrap", flexDirection: "row", rowGap: 16 }}
          dangerouslySetInnerHTML={{ __html: renderText }}
        />
      ) : (
        <Form form={form} layout="vertical" className={s.modal__form}>
          <Form.Item
            label={t("form.gender")}
            name="gender"
            rules={[{ required: true, message: t("form.required") }]}
          >
            <Radio.Group onChange={handleGenderChange} buttonStyle="solid">
              <Radio.Button value="М">{t("form.male")}</Radio.Button>
              <Radio.Button value="Ж">{t("form.female")}</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={t("form.imagePrompts.first")}
            name="images_prompt_1"
            rules={[{ required: true, message: t("form.required") }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label={t("form.imagePrompts.second")}
            name="images_prompt_2"
            rules={[{ required: true, message: t("form.required") }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label={t("form.imagePrompts.third")}
            name="images_prompt_3"
            rules={[{ required: true, message: t("form.required") }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label={t("form.videoPrompts.first")}
            name="video_prompt_1"
            rules={[{ required: true, message: t("form.required") }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label={t("form.videoPrompts.second")}
            name="video_prompt_2"
            rules={[{ required: true, message: t("form.required") }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label={t("form.videoPrompts.third")}
            name="video_prompt_3"
            rules={[{ required: true, message: t("form.required") }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label={t("form.audioText")}
            name="audio_text"
            rules={[{ required: true, message: t("form.required") }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      )}
      {contextHolder}
    </Modal>
  );
};
