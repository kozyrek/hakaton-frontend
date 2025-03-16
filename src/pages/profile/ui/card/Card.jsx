import React from "react";
import cn from "classnames";
import styles from "./Card.module.css";
import CardBigLogo from "./cardBigLogo";
import CardBigLogo2 from "./cardBigLogo2";

export default function Card({
  team,
  onDelete,
  logoVariant = "default",
  buttonText = "Удалить команду",
  cardClassName = "",
  colorCard = "default",
  titleSize = "default",
  buttonClassName = ""
}) {
  const Logo = logoVariant === "alternative" ? CardBigLogo2 : CardBigLogo;

  const className = cn(cardClassName, styles.teamCard, styles[colorCard]);
  const titleClass = cn(styles.teamTitle, styles[titleSize]);
  const buttonClass = cn(styles.deleteButton, buttonClassName);

  return (
    <div className={className}>
      <h3 className={titleClass}>{team}</h3>
      <Logo className={styles.bigLogo} />
      <button className={buttonClass} onClick={onDelete}>{buttonText}</button>
    </div>
  );
}
