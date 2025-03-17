import { useEffect, useState } from "react";
import { IChamp } from "../../data/interfaces";
import Button from "../Button/Button";
import Label from "../Label/Label";
import "./ChampDisplay.css";
import { AnimatePresence, motion } from "motion/react";

interface ChampDisplayProps {
  champion?: IChamp;
}

function ChampDisplay({ champion }: ChampDisplayProps) {
  const [randomChamp, setRandomChamp] = useState<IChamp | undefined>(champion);

  useEffect(() => {
    setRandomChamp(champion);
  }, [champion]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={randomChamp?.id + "Random"}
        layout
        transition={{ duration: 1, type: "spring" }}
        initial={{ scale: 0, rotate: 25, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0, rotate: -25, opacity: 0 }}
        className="champ-display"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(33, 34, 41, 0) 0%, rgba(33, 34, 41, 0.8) 100%), url("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${randomChamp?.id}_0.jpg")`,
        }}
      >
        <div className="info">
          <h2 className="underlined">{randomChamp?.name || "Name"}</h2>
          <p className="title">{randomChamp?.title || "Title"}</p>
          <div className="roles">
            {randomChamp &&
              randomChamp.roles?.map((role) => (
                <Label key={role} text={role} icon={role} labelStyle="secondary" />
              ))}
          </div>
        </div>
        <Button
          text="Skin"
          btnStyle="label-only"
          icon="refresh"
          iconPosition="last"
          size="s"
          italic
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default ChampDisplay;
