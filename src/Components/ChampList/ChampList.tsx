import Icon from "../Icon/Icon";
import "./ChampList.css";

interface ChampListProps {
  title?: string;
  champions?: string[];
}

function ChampList({ title, champions }: ChampListProps) {
  return (
    <div className="champ-list">
      <h3>
        {title || "Title"}
        <span>{" (" + (champions?.length || "?") + ")"}</span>
      </h3>
      <input className="search" type="text" placeholder="Search..." />
      <ul className="list">
        <li>
          <figure className="portrait">
            <i className="ph-bold ph-x remove"></i>
            <img
              src="https://ddragon.leagueoflegends.com/cdn/14.16.1/img/champion/Aatrox.png"
              alt=""
            />
          </figure>
          <p className="name">Name</p>
          <div className="roles">
            <div className="role">
              <Icon type="top"></Icon>
            </div>
            <div className="role">
              <Icon type="middle"></Icon>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ChampList;
