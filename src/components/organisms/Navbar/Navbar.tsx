import { Flex } from "antd";
import { NavbarItem } from "./NavbarItem";
import { NAVBAR_ITEMS } from "./config";

export const Navbar = () => {
  return (
    <Flex gap={40} align="center">
      {NAVBAR_ITEMS.map((item) => (
        <NavbarItem item={item} />
      ))}
    </Flex>
  );
};
