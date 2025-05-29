import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import type { INavbarItem } from "../config";

import s from "./NavbarItem.module.scss";

type NavbarItemProps = {
  item: INavbarItem;
};

export const NavbarItem = ({ item }: NavbarItemProps) => {
  const { t } = useTranslation();

  return (
    <NavLink key={item.key} to={item.to} className={s.navlink}>
      {({ isActive }) => (
        <>
          {t(`navigation.${item.key}`)}
          {isActive && <div className={s.navlink__underline} />}
        </>
      )}
    </NavLink>
  );
};
