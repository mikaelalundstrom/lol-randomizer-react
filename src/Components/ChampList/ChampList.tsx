import { useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import "./ChampList.css";
import { motion } from "motion/react";
import { IChamp } from "../../data/interfaces";

interface ChampListProps {
  id: string;
  title?: string;
  champions?: IChamp[];
  version: string;
  removefromList: (id: string) => void;
}

function ChampList({ title, champions, version, removefromList, id }: ChampListProps) {
  const [ver, setVer] = useState(version);

  useEffect(() => {
    setVer(version);
  }, [version]);

  return (
    <div className="champ-list">
      <h3>
        {title || "Title"}
        <span>{" (" + (champions?.length || "0") + ")"}</span>
      </h3>
      <input className="search" type="text" placeholder="Search..." />
      <ul className="list">
        {champions?.map((champion) => (
          <motion.li
            key={champion.id}
            transition={{ duration: 0.7, type: "spring", delay: 0.1 }}
            initial={{ x: id === "included" ? 100 : -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            layout
          >
            <div>
              <figure className="portrait">
                <i className="ph-bold ph-x remove" onClick={() => removefromList(champion.id)}></i>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${ver}/img/champion/${champion.id}.png`}
                  alt=""
                />
              </figure>
              <p className="name">{champion.name}</p>
              <div className="roles">
                {champion.roles?.map((role, i) => (
                  <div key={i} className="role">
                    <Icon type={role.toLowerCase()}></Icon>
                  </div>
                ))}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default ChampList;
