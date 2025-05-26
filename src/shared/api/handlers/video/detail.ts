import { API_URLS, http } from "../../config";
import {
  type VideoEntity,
  type VideoEntityApi,
  videoSchema,
} from "../../entities";

export const getVideoDetail = async (
  id: string
): Promise<VideoEntity | null> => {
  const { data } = await http.get<VideoEntityApi>(API_URLS.video.detail(id));

  const parsed = videoSchema.safeParse(data);

  if (parsed.error) {
    return null;
  }

  return parsed.data;
};
