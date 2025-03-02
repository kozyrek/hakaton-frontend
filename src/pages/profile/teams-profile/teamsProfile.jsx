import React, { useState } from "react";
import styles from "./teamsProfile.module.css";
import Button from "../../../components/button/button";

const TeamsProfile = ({ myTeams, allTeams }) => {
  const [activeTab, setActiveTab] = useState("myTeams");
  const menuItems = [
    { key: "myTeams", label: "Мои команды" },
    { key: "allTeams", label: "Все команды" },
  ];
  return (
    <div className={styles.teamsGrid}>
      <h3>Команды</h3>
      <div className={styles.profileMenu}>
      {menuItems.map(({ key, label }) => (
        <Button
          key={key}
          bigmenu
          text={label}
          addClass={styles.secondMenuButton}
          isActive={activeTab === key} // Передаём активное состояние
          onClick={() => setActiveTab(key)}
        />
      ))}
    </div>

      {activeTab === "myTeams" && (
        <div className={styles.cardsContainer}>
          <h4>Мои команды</h4>
          {myTeams.map((team, index) => (
            <div key={index} className={styles.cardItem}>
              <p>{team}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "allTeams" && (
        <div className={styles.cardsContainer}>
          <h4>Все команды</h4>
          {allTeams.map((team, index) => (
            <div key={index} className={styles.cardItem}>
              <p>{team}</p>
            </div>
          ))}
        </div>
      )}

       <Button  text="Создать команду" onClick={() => alert("Создать команду")}/>
    </div>
  );
};

export default TeamsProfile;
