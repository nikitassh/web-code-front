import {
  Button as AntdButton,
  type ButtonProps as AntdButtonProps,
} from "antd";

type ButtonProps = AntdButtonProps;

export const Button: React.FC<ButtonProps> = (props) => {
  return <AntdButton shape="round" {...props} />;
};
