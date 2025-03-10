import Icon from "../Icon/Icon";

interface LabelProps {
  text?: string;
  icon?: string;
  iconPosition?: string;
  size?: "s" | "m";
  labelStyle?: "primary" | "secondary";
}

function Label({ text, icon, iconPosition, size, labelStyle }: LabelProps) {
  return (
    <div className={`label size-${size} label-${labelStyle}`}>
      {icon && iconPosition !== "last" && <Icon type={icon} />} {text}
      {icon && iconPosition === "last" && <Icon type={icon} />}
    </div>
  );
}

export default Label;
