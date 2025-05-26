import { useMutation } from "react-query";
import { API_URLS } from "../../config";
import { postVideoGenerate } from "../../handlers/video";

export const useVideoGenerate = () => {
  return useMutation({
    mutationKey: [API_URLS.video.generate],
    mutationFn: postVideoGenerate,
  });
};
