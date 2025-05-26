import { Flex } from "antd";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { SelectLanguage } from "../SelectLanguage";
import s from "./Navbar.module.scss";

const NAVBAR_ITEMS = [
  { to: "/", key: "home" },
  { to: "/examples", key: "examples" },
  { to: "/my-videos", key: "myVideos" },
  { to: "/faq", key: "faq" },
];

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <Flex gap={32} align="center">
      {NAVBAR_ITEMS.map(({ to, key }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            clsx(s.navlink, isActive && s.navlink__active)
          }
        >
          {t(`navigation.${key}`)}
        </NavLink>
      ))}
      <SelectLanguage />
    </Flex>
  );
};
