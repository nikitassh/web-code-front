export const API_URLS = {
  video: {
    list: "/video/list/",
    generate: "/video/generate/",
    detail: (uuid: string) => `/video/${uuid}/`,
  },
};

export const API_URL = "https://purple-bats-kiss.loca.lt";
