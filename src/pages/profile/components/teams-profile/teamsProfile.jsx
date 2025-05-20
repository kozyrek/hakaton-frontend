import React, { useEffect, useState } from "react";
import styles from "./teamsProfile.module.css";
import Button from "../../../../components/button/button";
import ModalWindow from "../../../../components/modalWindow";
import Card from "../../ui/card/Card";
import ModalWrapper from "../../../../components/modalOverlay";
import getAllTeams from "../../../../api/team/getAllTeam";

const TeamsProfile = ({ myTeams, allTeams }) => {
  const [activeTab, setActiveTab] = useState("myTeams");
  const [myTeamsState, setMyTeamsState] = useState([]);
  const [allTeamsState, setAllTeamsState] = useState([]);
  const [isCreateTeam, setIsCreateTeam] = useState(false);
  const [isDeleteTeam, setIsDelteTeam] = useState(false);

  // Состояния для модального окна
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const menuItems = [
    { key: "myTeams", label: "Мои команды" },
    { key: "allTeams", label: "Все команды" },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllTeams();
        console.log(response);
        setMyTeamsState(response.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  const openModal = (teamName) => {
    setSelectedTeam(teamName);
    setShowModal(true);
  };

  const cancelRemoval = () => {
    setShowModal(false);
    setSelectedTeam(null);
  };

  const handleDeleteTeam = async (id) => {
    setIsDelteTeam(true);
  };

  // const confirmRemoval = () => {
  //   if (selectedTeam) {
  //     if (activeTab === "myTeams") {
  //       setMyTeamsState((prev) => prev.filter((t) => t !== selectedTeam));
  //     } else {
  //       setAllTeamsState((prev) => prev.filter((t) => t !== selectedTeam));
  //     }
  //   }
  //   cancelRemoval();
  // };

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
              key={team.id}
              team={team}
              onDelete={() => handleDeleteTeam(team.id)}
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
              onDelete={() => handleDeleteTeam(team)}
              logoVariant="default"
            />
          ))}
        </div>
      )}
      <div className={styles.createButton}>
        <Button
          large
          text="Создать команду"
          onClick={() => setIsCreateTeam(true)}
        />
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <ModalWindow
            title="Действительно хотите удалить данную команду?"
            description={selectedTeam}
            // setIsShow={cancelRemoval}
          >
            <div className={styles.buttonContainer}>
              <Button
                text="Да"
                large
                // onClick={confirmRemoval}
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

      {isCreateTeam && (
        <ModalWrapper
          isOpen={isCreateTeam}
          onClose={() => setIsCreateTeam(false)}
        >
          <ModalWindow title="Создание новой команды" />
        </ModalWrapper>
      )}

      <ModalWrapper
        isOpen={isDeleteTeam}
        onClose={() => setIsDelteTeam(false)}
      >
        <ModalWindow title="Вы хотите удалить данную команду?" />
      </ModalWrapper>
    </div>
  );
};

export default TeamsProfile;
