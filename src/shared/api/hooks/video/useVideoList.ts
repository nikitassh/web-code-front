import { useQuery } from "react-query";
import { API_URLS } from "../../config";
import { getVideoList } from "../../handlers/video";

export const useVideoList = () => {
  return useQuery({
    queryKey: [API_URLS.video.list],
    queryFn: getVideoList,
  });
};
