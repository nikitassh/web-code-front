import clsx from "clsx";
import type { FC, ReactNode } from "react";
import s from "./Container.module.scss";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

export const Container: FC<ContainerProps> = ({
  children,
  className,
  maxWidth = "xl",
}) => {
  return (
    <div className={clsx(s.container, s[maxWidth], className)}>{children}</div>
  );
};
