import * as React from "react";
import { PROMPT } from "./config";

type JSONResponse = {
  gender: string;
  images_prompt_1: string;
  images_prompt_2: string;
  images_prompt_3: string;
  video_prompt_1: string;
  video_prompt_2: string;
  video_prompt_3: string;
  audio_text: string;
};

export const useModalAI = (letterText: string) => {
  const [text, setText] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFinished, setIsFinished] = React.useState<boolean>(false);

  const fetchAIPrompt = React.useCallback(async () => {
    if (!letterText) {
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
          messages: [{ role: "user", content: PROMPT + letterText }],
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

    setIsFinished(true);
    setIsLoading(false);
  }, [letterText]);

  const parseJson = React.useCallback((text: string): JSONResponse | null => {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }, []);

  const renderText = text
    .replace(/[{}]/g, "")
    .replace(/"gender":\s*"М"/g, '"gender": "Мужской"')
    .replace(/"gender":\s*"Ж"/g, '"gender": "Женский"')
    .replace(/"gender"/g, "<strong>Пол</strong>")
    .replace(
      /"images_prompt_1"/g,
      "<strong>Сценарий для первого изоражения</strong>"
    )
    .replace(
      /"images_prompt_2"/g,
      "<strong>Сценарий для второго изоражения</strong>"
    )
    .replace(
      /"images_prompt_3"/g,
      "<strong>Сценарий для третьего изоражения</strong>"
    )
    .replace(/"video_prompt_1"/g, "<strong>Сценарий для первого видео</strong>")
    .replace(/"video_prompt_2"/g, "<strong>Сценарий для второго видео</strong>")
    .replace(
      /"video_prompt_3"/g,
      "<strong>Сценарий для третьего видео</strong>"
    )
    .replace(/"audio_text"/g, "<strong>Текст для озвучки</strong>");

  return {
    fetchAIPrompt,
    renderText,
    isLoading,
    isFinished,
    text,
    setText,
    parseJson,
  };
};
