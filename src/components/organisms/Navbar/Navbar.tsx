import { NAVBAR_ITEMS } from "./config";
import s from "./Navbar.module.scss";
import { NavbarItem } from "./NavbarItem";

export const Navbar = () => {
  return (
    <div className={s.navbar}>
      {NAVBAR_ITEMS.map((item) => (
        <NavbarItem item={item} />
      ))}
    </div>
  );
};
