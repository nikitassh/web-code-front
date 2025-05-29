import { Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PROMPT } from "./prompt";

export const Test = () => {
  const { t } = useTranslation();
  const [letter, setLetter] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    gender: "",
    images_prompt_1: "",
    images_prompt_2: "",
    images_prompt_3: "",
    video_prompt_1: "",
    video_prompt_2: "",
    video_prompt_3: "",
    audio_text: "",
  });

  const callApi = async () => {
    if (!letter) {
      return;
    }

    setIsLoading(true);

    setText("");

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          stream: true,
          messages: [{ role: "user", content: PROMPT + letter }],
        }),
      }
    );

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices[0]?.delta?.content || "";
            setText((prev) => prev + content);
          } catch (e) {
            console.error("Error parsing JSON:", e);
          }
        }
      }
    }

    setIsLoading(false);
  };

  // Обработка текста при рендере
  const processedText = text
    .replace(/[{}]/g, "")
    .replace(/"gender":\s*"М"/g, `"gender": "${t("form.male")}"`)
    .replace(/"gender":\s*"Ж"/g, `"gender": "${t("form.female")}"`)
    .replace(/"gender"/g, `<strong>${t("form.gender")}</strong>`)
    .replace(
      /"images_prompt_1"/g,
      `<strong>${t("form.imagePrompts.first")}</strong>`
    )
    .replace(
      /"images_prompt_2"/g,
      `<strong>${t("form.imagePrompts.second")}</strong>`
    )
    .replace(
      /"images_prompt_3"/g,
      `<strong>${t("form.imagePrompts.third")}</strong>`
    )
    .replace(
      /"video_prompt_1"/g,
      `<strong>${t("form.videoPrompts.first")}</strong>`
    )
    .replace(
      /"video_prompt_2"/g,
      `<strong>${t("form.videoPrompts.second")}</strong>`
    )
    .replace(
      /"video_prompt_3"/g,
      `<strong>${t("form.videoPrompts.third")}</strong>`
    )
    .replace(/"audio_text"/g, `<strong>${t("form.audioText")}</strong>`);

  return (
    <div>
      <input type="text" onChange={(e) => setLetter(e.target.value)} />
      <button onClick={callApi}>ok</button>
      <h1>test</h1>
      <div
        style={{ whiteSpace: "pre-wrap" }}
        dangerouslySetInnerHTML={{ __html: processedText }}
      />
      <Button
        disabled={isLoading}
        onClick={() => {
          const value = JSON.parse(text);
          setForm(value);
        }}
      >
        {t("modal.edit")}
      </Button>
      {form.gender && (
        <form style={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
          <label>{t("form.gender")}</label>
          <input type="text" value={form.gender} />
          <label>{t("form.imagePrompts.first")}</label>
          <input type="text" value={form.images_prompt_1} />
          <label>{t("form.imagePrompts.second")}</label>
          <input type="text" value={form.images_prompt_2} />
          <label>{t("form.imagePrompts.third")}</label>
          <input type="text" value={form.images_prompt_3} />
          <label>{t("form.videoPrompts.first")}</label>
          <input type="text" value={form.video_prompt_1} />
          <label>{t("form.videoPrompts.second")}</label>
          <input type="text" value={form.video_prompt_2} />
          <label>{t("form.videoPrompts.third")}</label>
          <input type="text" value={form.video_prompt_3} />
          <label>{t("form.audioText")}</label>
          <input type="text" value={form.audio_text} />
        </form>
      )}
    </div>
  );
};
