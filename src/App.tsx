import { useEffect, useState } from "react";
import "./App.css";
import Button from "./Components/Button/Button";
import ChampDisplay from "./Components/ChampDisplay/ChampDisplay";
import ChampList from "./Components/ChampList/ChampList";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import FlexGroup from "./Components/FlexGroup/FlexGroup";
import axios from "axios";
import CHAMPIONS from "./data/champions.json";
import { IChamp, IRole, ISkin } from "./data/interfaces";
import { AnimatePresence, motion } from "motion/react";

const rolesList = [
  {
    name: "Top",
    icon: "top",
    active: true,
  },
  {
    name: "Jungle",
    icon: "jungle",
    active: true,
  },
  {
    name: "Middle",
    icon: "middle",
    active: true,
  },
  {
    name: "Bottom",
    icon: "bottom",
    active: true,
  },
  {
    name: "Support",
    icon: "support",
    active: true,
  },
];

const defaultSkin = {
  name: "default",
  id: 0,
};

function App() {
  const [roles, setRoles] = useState(rolesList);
  const [version, setVersion] = useState("");
  const [champions, setChampions] = useState<IChamp[]>();
  const [randomChamp, setRandomChamp] = useState<IChamp>();
  const [skin, setSkin] = useState<ISkin>(defaultSkin);

  const formatChamps = async (champs: IChamp[]) => {
    try {
      const response = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
      );
      console.log(response.data.data);

      const data = response.data.data;

      const champions = champs.map((champ) => {
        for (const item in data) {
          if (champ.id === data[item].id) {
            champ.title = data[item].title;
          }
        }
        champ.included = true;
        return champ;
      });

      setChampions(champions);
      randomize(champions);
    } catch (error) {
      console.log(error);
    }
  };

  const getDDragonVer = async () => {
    try {
      const response = await axios.get("https://ddragon.leagueoflegends.com/api/versions.json");
      console.log(response.data[0]);
      setVersion(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const randomize = (champions: IChamp[] | undefined) => {
    if (champions) {
      const activeRoles = roles.filter((role) => role.active).map((role) => role.name);
      const validChamps = champions
        .filter((champion) => champion.included)
        .filter((champion) => {
          if (activeRoles.some((role) => champion.roles?.includes(role))) {
            return champion;
          }
        });
      const random = Math.floor(Math.random() * validChamps.length);
      console.log(validChamps[random]);
      setSkin(defaultSkin);
      setRandomChamp(validChamps[random]);
    }
  };

  const randomizeSkin = async () => {
    try {
      const response = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/15.3.1/data/en_US/champion/${randomChamp?.id}.json`
      );
      console.log(response.data.data[randomChamp!.id].skins);
      const skins = response.data.data[randomChamp!.id].skins;
      const random = Math.floor(Math.random() * skins.length);
      const randomSkin = {
        id: skins[random].num,
        name: skins[random].name,
      };
      setSkin(randomSkin);
    } catch (error) {
      console.log(error);
    }
  };

  const onRoleBtnClick = (roleToUpdate: IRole) => {
    const updateRoleStatus = roles.map((role) => {
      return role === roleToUpdate ? { ...role, active: !role.active } : role;
    });
    setRoles(updateRoleStatus);
  };

  const onRoleAllBtnClick = () => {
    if (roles.every((role) => role.active)) {
      setRoles(
        roles.map((role) => {
          return { ...role, active: false };
        })
      );
    } else {
      setRoles(
        roles.map((role) => {
          return { ...role, active: true };
        })
      );
    }
  };

  const swapLists = () => {
    if (champions) {
      const swapped = champions.map((champion) => {
        return { ...champion, included: !champion.included };
      });

      setChampions(swapped);
    }
  };

  const removeFromList = (id: string) => {
    if (champions) {
      const updatedList = champions.map((champion) => {
        if (champion.id === id) {
          return { ...champion, included: !champion.included };
        } else {
          return champion;
        }
      });

      setChampions(updatedList);
    }
  };

  useEffect(() => {
    getDDragonVer();
  }, []);

  useEffect(() => {
    if (version) {
      formatChamps(CHAMPIONS);
    }
  }, [version]);

  return (
    <>
      <AnimatePresence mode="popLayout">
        <motion.img
          key={randomChamp?.id + "RandomBg" + skin.id}
          transition={{ duration: 1.5, type: "spring" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="background"
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${randomChamp?.id}_${skin.id}.jpg`}
          alt={randomChamp?.name}
        />
      </AnimatePresence>

      <Header title="Champion Randomizer" />
      <main>
        {randomChamp && (
          <ChampDisplay champion={randomChamp} skin={skin} randomizeSkin={randomizeSkin} />
        )}
        <FlexGroup gap="1rem" margin="3rem 0" justifyContent="center">
          <Button
            text="All"
            btnStyle={roles.every((role) => role.active) ? "primary" : "transparent"}
            onClick={onRoleAllBtnClick}
          />
          {roles.map((role, i) => (
            <Button
              key={i}
              text={role.name}
              icon={role.icon}
              btnStyle={role.active ? "primary" : "transparent"}
              onClick={() => onRoleBtnClick(role)}
            />
          ))}
        </FlexGroup>
        <FlexGroup justifyContent="center">
          <Button
            text="Randomize"
            pill
            btnStyle="secondary"
            size="l"
            onClick={() => randomize(champions)}
          />
        </FlexGroup>

        <FlexGroup justifyContent="space-between" alignItems="center" gap="4rem" margin="8rem 0">
          <ChampList
            title="Included Champions"
            champions={champions?.filter((champion) => champion.included)}
            version={version}
            removefromList={removeFromList}
            id="included"
          />
          <Button icon="swap" size="l" btnStyle="label-only" onClick={() => swapLists()} />
          <ChampList
            title="Excluded Champions"
            champions={champions?.filter((champion) => !champion.included)}
            version={version}
            removefromList={removeFromList}
            id="excluded"
          />
        </FlexGroup>

        <div className="about">
          <h2>About the League Randomizer</h2>
          <p>
            Randomize League of Legends champions with a role filter. You can select multiple roles
            at once, or just one (the choice is yours). You can also randomize the skin for
            individual champions. The roles assigned to each champion are based on this list. It
            combines data straight from the game client, as well as those statistically determined
            by third party analytics services. It is also possible to include/exclude champions from
            the pool (your browser will remember your selection) to customize your randomization
            further.
          </p>
          <p>
            I don't intend for this page to be wildely used, it was made on a request from a friend
            and I saw it as a great opportunity to challenge myself to make a simple web app. New
            champions are added to the pool manually(because of the custom role assignment), but
            skins/images stays up-to-date automatically since they are fetched directly from the
            League API.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
