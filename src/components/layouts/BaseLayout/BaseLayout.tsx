import { Header } from "@/components/organisms";
import { Outlet } from "react-router-dom";

import s from "./BaseLayout.module.scss";

export const BaseLayout = () => {
  return (
    <div>
      <Header />
      <div className={s.layout__outlet}>
        <Outlet />
      </div>
    </div>
  );
};
