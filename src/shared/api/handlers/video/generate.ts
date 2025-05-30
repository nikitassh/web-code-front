import { API_URLS, http } from "../../config";

type PostVideoGeneratePayload = {
  uuid: string;
  gender: string;
  images_prompt_1: string;
  images_prompt_2: string;
  images_prompt_3: string;
  video_prompt_1: string;
  video_prompt_2: string;
  video_prompt_3: string;
  audio_text: string;
  original_text: string;
};

export const postVideoGenerate = async (payload: PostVideoGeneratePayload) => {
  const response = await http.post(API_URLS.video.generate, payload);

  return response.data;
};
