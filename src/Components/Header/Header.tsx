import Icon from "../Icon/Icon";
import "./Header.css";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header>
      <Icon type="dice" />
      <h1>{title}</h1>
    </header>
  );
}

export default Header;
