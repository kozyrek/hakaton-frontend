import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../utils/constants";
import styles from "./teamsProfile.module.css";
import Button from "../../../../components/button/button";
import ModalWindow from "../../../../components/modalWindow";
import Card from "../../ui/card/Card";

const TeamsProfile = ({ myTeams, allTeams }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myTeams");
  const [myTeamsState, setMyTeamsState] = useState(myTeams);
  const [allTeamsState, setAllTeamsState] = useState(allTeams);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeamForDeletion, setSelectedTeamForDeletion] = useState(null);

  const menuItems = [
    { key: "myTeams", label: "Мои команды" },
    { key: "allTeams", label: "Все команды" },
  ];

  const openModal = (teamName) => {
    setSelectedTeamForDeletion(teamName);
    setShowModal(true);
  };

  const cancelRemoval = () => {
    setShowModal(false);
    setSelectedTeamForDeletion(null);
  };

  const confirmRemoval = () => {
    if (selectedTeamForDeletion) {
      if (activeTab === "myTeams") {
        setMyTeamsState((prev) =>
          prev.filter((t) => t !== selectedTeamForDeletion)
        );
      } else {
        setAllTeamsState((prev) =>
          prev.filter((t) => t !== selectedTeamForDeletion)
        );
      }
    }
    cancelRemoval();
  };

  const handleTeamClick = (team) => {
    navigate(ROUTES.TEAMSPAGE.replace(":teamId", team));
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
              onClick={() => handleTeamClick(team)}
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
              onClick={() => handleTeamClick(team)}
            />
          ))}
        </div>
      )}
      <div className={styles.createButton}>
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
            description={selectedTeamForDeletion}
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
