import Icon from "../Icon/Icon";
import "./Button.css";

interface ButtonProps {
  text?: string;
  btnStyle?: "primary" | "secondary" | "label-only" | "transparent";
  size?: "s" | "m" | "l";
  pill?: boolean;
  icon?: string;
  iconPosition?: "first" | "last";
  italic?: boolean;
  onClick?: () => void;
}

function Button({ text, btnStyle, size, pill, icon, iconPosition, italic, onClick }: ButtonProps) {
  const doOnClick = () => {
    if (onClick) onClick();
  };
  return (
    <button
      className={`button style-${btnStyle} size-${size} ${pill && "pill"} ${italic && "italic"} `}
      onClick={doOnClick}
    >
      {icon && iconPosition !== "last" && <Icon type={icon} />} {text}
      {icon && iconPosition === "last" && <Icon type={icon} />}
    </button>
  );
}

export default Button;
