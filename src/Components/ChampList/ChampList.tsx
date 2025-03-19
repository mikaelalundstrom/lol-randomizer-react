import { useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import "./ChampList.css";
import { motion } from "motion/react";
import { IChamp } from "../../data/interfaces";
import Button from "../Button/Button";

interface ChampListProps {
  id: string;
  title?: string;
  champions?: IChamp[];
  version: string;
  removefromList: (id: string) => void;
}

function ChampList({ title, champions, version, removefromList, id }: ChampListProps) {
  const [ver, setVer] = useState(version);
  const [searchInput, setSearchInput] = useState<string>("");
  const [listItems, setListItems] = useState<IChamp[] | undefined>(champions);

  const search = () => {
    const filteredItems = champions?.filter((champion) => {
      if (searchInput.length < 3) {
        if (champion.name.toLowerCase().startsWith(searchInput.toLowerCase())) return champion;
      } else {
        if (champion.name.toLowerCase().includes(searchInput.toLowerCase())) return champion;
      }
    });
    setListItems(filteredItems);
  };

  useEffect(() => {
    setVer(version);
  }, [version]);

  useEffect(() => {
    search();
  }, [searchInput]);

  useEffect(() => {
    setListItems(champions);
    if (searchInput.length > 0) {
      search();
    }
  }, [champions]);

  return (
    <div className="champ-list">
      <h3>
        {title || "Title"}
        <span>{" (" + (champions?.length || "0") + ")"}</span>
      </h3>
      <div className="search">
        <input
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className="search"
          type="text"
          value={searchInput}
          placeholder="Search..."
        />
        {searchInput.length > 0 && (
          <Button btnStyle="label-only" icon="close" size="s" onClick={() => setSearchInput("")} />
        )}
      </div>

      <motion.ul layoutScroll className="list">
        {listItems?.map((champion) => (
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
      </motion.ul>
    </div>
  );
}

export default ChampList;
