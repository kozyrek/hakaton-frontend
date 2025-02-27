import React, { useState } from "react";
import styles from "./teamsProfile.module.css";
import MenuButton from "../ui/menuBtn/menuButton";

const TeamsProfile = ({ myTeams, allTeams }) => {
  const [activeTab, setActiveTab] = useState("myTeams");

  return (
    <div className={styles.teamsGrid}>
      <h3>Команды</h3>
      <div className={styles.profileMenu}>
        <MenuButton isActive={activeTab === "myTeams"} onClick={() => setActiveTab("myTeams")}>
          Мои команды
        </MenuButton>
        <MenuButton isActive={activeTab === "allTeams"} onClick={() => setActiveTab("allTeams")}>
          Все команды
        </MenuButton>
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
    </div>
  );
};

export default TeamsProfile;
