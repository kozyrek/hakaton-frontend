import cn from "classnames";
import styles from "./Card.module.css";
import CardBigLogo from "./cardBigLogo";
import CardBigLogo2 from "./cardBigLogo2";
import { Link } from "react-router-dom";

export default function Card({
  team,
  onDelete,
  logoVariant = "default",
  buttonText = "Удалить команду",
  cardClassName = "",
  colorCard = "default",
  buttonClassName = "",
  isProject = false,
}) {
  const Logo = logoVariant === "alternative" ? CardBigLogo2 : CardBigLogo;

  const className = cn(cardClassName, styles.teamCard, styles[colorCard]);
  const titleClass = cn(styles.teamTitle, "titleH3");
  const buttonClass = cn(styles.deleteButton, buttonClassName, "text2");

  return (
    <>
      <div className={className}>
        <Link 
          className={styles.itemLink} 
          to={`${isProject ? "/project/" : "/team/"}${team.id}`}
        >
          {isProject
          ? <p className={`text3 ${styles.teamTitle}`}>«{team.name}»</p>
          : <h3 className={titleClass}>{team.name}</h3>}
          
          <Logo className={styles.bigLogo} />
        </Link>
        <button className={buttonClass} onClick={onDelete}>
          {buttonText}
        </button>
      </div>
    </>
  );
}
