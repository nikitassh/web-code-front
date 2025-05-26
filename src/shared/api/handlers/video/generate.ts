import { API_URLS, http } from "../../config";

type PostVideoGeneratePayload = {
  text: string;
  uuid: string;
};

export const postVideoGenerate = async (payload: PostVideoGeneratePayload) => {
  const response = await http.post(API_URLS.video.generate, payload);

  return response.data;
};
