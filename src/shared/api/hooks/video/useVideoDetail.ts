import { useQuery } from "react-query";
import { API_URLS } from "../../config";
import type { VideoEntity } from "../../entities";
import { getVideoDetail } from "../../handlers/video";

export const useVideoDetail = (uuid?: string) => {
  return useQuery<VideoEntity | null>({
    queryKey: [API_URLS.video.detail, uuid],
    queryFn: () => getVideoDetail(uuid!),
    enabled: !!uuid,
    refetchInterval: (data) => {
      if (data?.status === "in_progress") {
        return 5000;
      }

      return false;
    },
  });
};
