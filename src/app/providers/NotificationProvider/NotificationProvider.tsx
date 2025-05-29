import { notification } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";

import * as React from "react";

type ContextType = NotificationInstance;

const NotificationContext = React.createContext<ContextType | null>(null);

export const NotificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification({
    top: 72,
    pauseOnHover: true,
    showProgress: true,
  });

  return (
    <NotificationContext.Provider value={api}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = React.useContext(NotificationContext);

  if (!context) {
    throw new Error("NotificationContext is not found");
  }

  return context;
};
