import jungleIcon from "../../assets/icon-jungle.png";
import middleIcon from "../../assets/icon-middle.png";
import topIcon from "../../assets/icon-top.png";
import bottomIcon from "../../assets/icon-bottom.png";
import supportIcon from "../../assets/icon-support.png";

const icons = {
  jungle: <img src={jungleIcon} alt="Jungle" />,
  middle: <img src={middleIcon} alt="Middle" />,
  top: <img src={topIcon} alt="Top" />,
  bottom: <img src={bottomIcon} alt="Bottom" />,
  support: <img src={supportIcon} alt="Support" />,
  swap: <i className="ph ph-arrows-left-right"></i>,
  refresh: <i className="ph ph-arrows-clockwise"></i>,
  dice: <i className="ph-bold ph-dice-three"></i>,
};

interface IconProps {
  type: string;
}

function Icon({ type }: IconProps) {
  return <figure className="icon">{icons[type as keyof typeof icons]}</figure>;
}

export default Icon;
