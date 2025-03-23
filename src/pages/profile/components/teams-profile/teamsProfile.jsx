import React, { useState } from "react";
import styles from "./teamsProfile.module.css";
import Button from "../../../../components/button/button";
import ModalWindow from "../../../../components/modalWindow";
import Card from "../../ui/card/Card";


const TeamsProfile = ({ myTeams, allTeams }) => {
  const [activeTab, setActiveTab] = useState("myTeams");

  // Локальные состояния для хранения списков команд (чтобы можно было удалять)
  const [myTeamsState, setMyTeamsState] = useState(myTeams);
  const [allTeamsState, setAllTeamsState] = useState(allTeams);

  // Состояния для модального окна
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const menuItems = [
    { key: "myTeams", label: "Мои команды" },
    { key: "allTeams", label: "Все команды" },
  ];

  const openModal = (teamName) => {
    setSelectedTeam(teamName);
    setShowModal(true);
  };


  const cancelRemoval = () => {
    setShowModal(false);
    setSelectedTeam(null);
  };


  const confirmRemoval = () => {
    if (selectedTeam) {
      if (activeTab === "myTeams") {
        setMyTeamsState((prev) => prev.filter((t) => t !== selectedTeam));
      } else {
        setAllTeamsState((prev) => prev.filter((t) => t !== selectedTeam));
      }
    }
    cancelRemoval();
  };

  return (
    <div className={styles.teamsGrid}>
      <h2 className={styles.profileTabTitle}>Команды</h2>
      <div className={styles.profileMenu}>
        {menuItems.map(({ key, label }) => (
          <Button
            key={key}
            bigmenu
            text={label}
            addClass={styles.secondMenuButton}
            isActive={activeTab === key}
            onClick={() => setActiveTab(key)}
          />
        ))}
      </div>
      {activeTab === "myTeams" && (
        <div className={styles.cardsContainer}>
          {myTeamsState.map((team, index) => (
            <Card 
              key={index} 
              team={team} 
              onDelete={() => openModal(team)} 
            />
          ))}
        </div>
      )}

      {activeTab === "allTeams" && (
        <div className={styles.cardsContainer}>
          {allTeamsState.map((team, index) => (
            <Card
            key={index} 
            team={team} 
            onDelete={() => openModal(team)} 
  logoVariant="default"
/>

         
          ))}
        </div>
      )}
<div  className={styles.createButton}>
     <Button
     large
        text="Создать команду"
        onClick={() => alert("Создать команду")}
      />

</div>
 
      {showModal && (
        <div className={styles.modalOverlay}>
          <ModalWindow
            title="Действительно хотите удалить данную команду?"
            description={selectedTeam}
            setIsShow={cancelRemoval}
          >
            <div className={styles.buttonContainer}>
            <Button
                text="Да"
                large
                onClick={confirmRemoval}
                addClass={styles.confirmButton}
              />
              <Button
                text="Нет"
                large
                onClick={cancelRemoval}
                addClass={styles.cancelButton}
              />
            </div>
          </ModalWindow>
        </div>
      )}
    </div>
  );
};

export default TeamsProfile;
