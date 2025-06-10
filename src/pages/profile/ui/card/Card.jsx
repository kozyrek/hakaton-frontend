import React from "react";
import cn from "classnames";
import styles from "./Card.module.css";
import CardBigLogo from "./cardBigLogo";
import CardBigLogo2 from "./cardBigLogo2";
import { Link } from "react-router-dom";

export default function Card({
  team,
  onDelete,
  // onClick,
  logoVariant = "default",
  buttonText = "Удалить команду",
  cardClassName = "",
  colorCard = "default",
  titleSize = "default",
  buttonClassName = "",
  isProject = false,
}) {
  const Logo = logoVariant === "alternative" ? CardBigLogo2 : CardBigLogo;

  const className = cn(cardClassName, styles.teamCard, styles[colorCard]);
  const titleClass = cn(styles.teamTitle, styles[titleSize]);
  const buttonClass = cn(styles.deleteButton, buttonClassName, "text2");

  return (
    <>
    {/* <div className={className} onClick={onClick}>
      <h3 className={titleClass}>{team.name}</h3>
      <Logo className={styles.bigLogo} />
      <button className={buttonClass} onClick={onDelete}>{buttonText}</button>
    </div> */}

      <div className={className}>
        <Link 
          className={styles.itemLink} 
          to={`${isProject ? "/project/" : "/team/"}${team.id}`}
          state={{projectId: team.id,}}//------для команды?
        >
          {isProject
          ? <p className="text3">«{team.name}»</p>
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
