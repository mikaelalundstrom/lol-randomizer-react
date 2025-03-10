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

interface IChamp {
  id: string;
  name: string;
  title?: string;
  included?: boolean;
}

interface IRole {
  name: string;
  icon: string;
  active: boolean;
}

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

function App() {
  const [roles, setRoles] = useState(rolesList);
  const [version, setVersion] = useState("");
  const [champions, setChampions] = useState<IChamp[]>();

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

  const getRandomChamp = () => {};

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

  useEffect(() => {
    getDDragonVer();
  }, []);

  useEffect(() => {
    if (version) formatChamps(CHAMPIONS);
  }, [version]);

  return (
    <>
      <Header title="Champion Randomizer" />
      <main>
        <ChampDisplay />
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
          <Button text="Randomize" pill btnStyle="secondary" size="l" />
        </FlexGroup>

        <FlexGroup justifyContent="space-between" alignItems="center" gap="4rem" margin="5rem 0">
          <ChampList />
          <Button icon="swap" size="l" btnStyle="label-only" />
          <ChampList />
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
