import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../utils/constants";
import styles from "./teamsProfile.module.css";
import Button from "../../../../components/button/button";
import { ConfirmDeleteModal, InputModal } from "../profileModals/ModalsList";
import Card from "../../ui/card/Card";

const TeamsProfile = ({ myTeams, allTeams }) => {
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamError, setNewTeamError] = useState("");
  const [activeTab, setActiveTab] = useState("myTeams");
  const [myTeamsState, setMyTeamsState] = useState(myTeams);
  const [allTeamsState, setAllTeamsState] = useState(allTeams);
  const [selectedTeamForDeletion, setSelectedTeamForDeletion] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isInputModalOpen, setInputModalOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { key: "myTeams", label: "Мои команды" },
    { key: "allTeams", label: "Все команды" },
  ];

  const handleDeleteClick = (team) => {
    setSelectedTeamForDeletion(team);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTeamForDeletion) {
      if (activeTab === "myTeams") {
        setMyTeamsState((prev) => prev.filter((t) => t !== selectedTeamForDeletion));
      } else {
        setAllTeamsState((prev) => prev.filter((t) => t !== selectedTeamForDeletion));
      }
    }
    setSelectedTeamForDeletion(null);
    setDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setSelectedTeamForDeletion(null);
    setDeleteModalOpen(false);
  };

  const openInputModal = () => {
    setNewTeamName("");
    setNewTeamError("");
    setInputModalOpen(true);
  };

  const handleCreateTeam = () => {
    const trimmedName = newTeamName.trim();
    if (!trimmedName) {
      setNewTeamError("Название не может быть пустым");
      return;
    }
    if ([...myTeamsState, ...allTeamsState].includes(trimmedName)) {
      setNewTeamError("Данное название уже занято. Введите другое название");
      return;
    }
    setMyTeamsState((prev) => [...prev, trimmedName]);
    setInputModalOpen(false);
  };

  const renderTeamCards = (teams, extraProps = {}) =>
    teams.map((team, idx) => (
      <Card
        key={idx}
        team={team}
        {...extraProps}
        onDelete={() => handleDeleteClick(team)}
        onClick={() => navigate(ROUTES.TEAMSPAGE.replace(':teamId', team))}
      />
    ));

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

      <div className={styles.cardsContainer}>
        {activeTab === "myTeams"
          ? renderTeamCards(myTeamsState)
          : renderTeamCards(allTeamsState, { logoVariant: "default" })}
      </div>

      <div className={styles.createButton}>
        <Button
          large
          text="Создать команду"
          onClick={openInputModal}
        />
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Удалить команду?"
        description={selectedTeamForDeletion || ''}
      />

      <InputModal
        title="Создание новой команды"
        placeholder="Название"
        createText="Создать"
        cancelText="Отменить"
        isOpen={isInputModalOpen}
        onClose={() => setInputModalOpen(false)}
        inputData={newTeamName}
        error={newTeamError}
        onChangeInputData={(value) => {
          setNewTeamName(value);
          setNewTeamError("");
        }}
        onConfirm={handleCreateTeam}
      />
    </div>
  );
};

export default TeamsProfile;
