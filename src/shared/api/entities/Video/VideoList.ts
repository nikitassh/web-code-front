import { z } from "zod";
import { videoObject } from "./Video";

export const videoListObject = z.array(videoObject);

export const videoListSchema = videoListObject.transform((raw) =>
  raw.map((video) => ({
    id: video.id,
    uuid: video.uuid,
    originalText: video.original_text,
    processedText: video.processed_text || video.original_text,
    authorGender: video.author_gender,
    imagePrompt1: video.image_prompt_1,
    imagePrompt2: video.image_prompt_2,
    imagePrompt3: video.image_prompt_3,
    videoPrompt1: video.video_prompt_1,
    videoPrompt2: video.video_prompt_2,
    videoPrompt3: video.video_prompt_3,
    audioUrlBrowser: video.audio_url_browser,
    audioUrlDownload: video.audio_url_download,
    imageUrl1: video.image_url_1,
    imageUrl2: video.image_url_2,
    imageUrl3: video.image_url_3,
    videoUrl1: video.video_url_1,
    videoUrl2: video.video_url_2,
    videoUrl3: video.video_url_3,
    finalVideo: video.final_video || null,
    createdAt: new Date(video.created_at),
  }))
);

export type VideoListEntityApi = z.input<typeof videoListSchema>;

export type VideoListEntity = z.infer<typeof videoListSchema>;
