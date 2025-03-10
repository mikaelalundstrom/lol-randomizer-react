import Button from "../Button/Button";
import Label from "../Label/Label";
import "./ChampDisplay.css";

function ChampDisplay() {
  return (
    <div className="champ-display">
      <div className="info">
        <h2 className="underlined">Nunu & Willump</h2>
        <p className="title">Title is a few</p>
        <div className="roles">
          <Label />
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
    </div>
  );
}

export default ChampDisplay;
