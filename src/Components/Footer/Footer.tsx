import FlexGroup from "../FlexGroup/FlexGroup";
import Icon from "../Icon/Icon";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <FlexGroup alignItems="center" gap="1rem">
        <h1>Champion randomizer</h1>
        <Icon type="dice" />
      </FlexGroup>

      <p>
        Champion Randomizer is not endorsed by Riot Games and does not reflect the views or opinions
        of Riot Games or anyone officially involved in producing or managing Riot Games properties.
        Riot Games and all associated properties are trademarks or registered trademarks of Riot
        Games, Inc.
      </p>
    </footer>
  );
}

export default Footer;
