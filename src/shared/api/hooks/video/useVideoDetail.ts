import { useQuery } from "react-query";
import { API_URLS } from "../../config";
import { getVideoDetail } from "../../handlers/video";

export const useVideoDetail = (uuid?: string) => {
  return useQuery({
    queryKey: [API_URLS.video.detail, uuid],
    queryFn: () => getVideoDetail(uuid!),
    enabled: !!uuid,
  });
};
