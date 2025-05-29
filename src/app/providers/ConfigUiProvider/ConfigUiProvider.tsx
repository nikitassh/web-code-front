import { ConfigProvider } from "antd";
import { CoreColors } from "./config";

export const ConfigUiProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            borderRadius: 24,
          },
        },
        token: {
          fontFamily:
            '"Ubuntu", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          ...CoreColors,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
