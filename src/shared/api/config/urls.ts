export const API_URLS = {
  video: {
    list: "/video/list/",
    generate: "/video/generate/",
    detail: (uuid: string) => `/video/${uuid}/`,
  },
};

export const API_URL = "https://tidy-bars-spend.loca.lt";
