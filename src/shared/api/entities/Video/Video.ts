import { z } from "zod";

export const videoObject = z.object({
  id: z.number(),
  uuid: z.string(),
  original_text: z.string(),
  processed_text: z.string(),
  author_gender: z.enum(["male", "female"]),
  image_prompt_1: z.string(),
  image_prompt_2: z.string(),
  image_prompt_3: z.string(),
  video_prompt_1: z.string(),
  video_prompt_2: z.string(),
  video_prompt_3: z.string(),
  audio_url_browser: z.string(),
  audio_url_download: z.string(),
  image_url_1: z.string(),
  image_url_2: z.string(),
  image_url_3: z.string(),
  video_url_1: z.string(),
  video_url_2: z.string(),
  video_url_3: z.string(),
  final_video: z.string().nullable(),
  created_at: z.string().datetime(),
});

export const videoSchema = videoObject.transform((raw) => ({
  id: raw.id,
  uuid: raw.uuid,
  originalText: raw.original_text,
  processedText: raw.processed_text || raw.original_text,
  authorGender: raw.author_gender,
  imagePrompt1: raw.image_prompt_1,
  imagePrompt2: raw.image_prompt_2,
  imagePrompt3: raw.image_prompt_3,
  videoPrompt1: raw.video_prompt_1,
  videoPrompt2: raw.video_prompt_2,
  videoPrompt3: raw.video_prompt_3,
  audioUrlBrowser: raw.audio_url_browser,
  audioUrlDownload: raw.audio_url_download,
  imageUrl1: raw.image_url_1,
  imageUrl2: raw.image_url_2,
  imageUrl3: raw.image_url_3,
  videoUrl1: raw.video_url_1,
  videoUrl2: raw.video_url_2,
  videoUrl3: raw.video_url_3,
  finalVideo: raw.final_video || null,
  createdAt: new Date(raw.created_at),
}));

export type VideoEntityApi = z.input<typeof videoSchema>;

export type VideoEntity = z.infer<typeof videoSchema>;
