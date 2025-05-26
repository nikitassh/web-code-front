import { API_URLS, http } from "../../config";
import {
  type VideoListEntity,
  type VideoListEntityApi,
  videoListSchema,
} from "../../entities";

export const getVideoList = async (): Promise<VideoListEntity | null> => {
  const { data } = await http.get<VideoListEntityApi>(API_URLS.video.list);

  const parsed = videoListSchema.safeParse(data);

  if (parsed.error) {
    return null;
  }

  return parsed.data;
};
