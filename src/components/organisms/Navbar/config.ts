export interface INavbarItem {
  to: string;
  key: string;
}

export const NAVBAR_ITEMS: INavbarItem[] = [
  { to: "/", key: "home" },
  { to: "/examples", key: "examples" },
  { to: "/my-videos", key: "myVideos" },
  { to: "/faq", key: "faq" },
];
