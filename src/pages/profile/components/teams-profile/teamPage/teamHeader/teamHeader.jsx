import React, { useState } from "react";
import styles from "./teamHeader.module.css";
import profilePhoto from "../../../../../../assests/images/photo/ivanIvanovProfile.png";
import Pencil from "../../../personal-info/images/Pencil";
import { useResize } from "../../../../../../hooks/useResize";
import { InputModal } from "../../../profileModals/ModalsList";

const TeamHeader = ({ teamName }) => {
  const [currentName, setCurrentName] = useState(teamName);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  const width = useResize();

  const openRenameModal = () => {
    setNewName(currentName);
    setError("");
    setIsModalOpen(true);
  };

  const handleRename = () => {
    const trimmed = newName.trim();
    if (!trimmed) {
      setError("Название не может быть пустым");
      return;
    }
    setCurrentName(trimmed);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.userInfoBlock}>
        <div
          className={styles.responsiveUserNameContainer}
          onClick={openRenameModal}
        >
          <h1 className={styles.userNameResponsive}>Команда {currentName}</h1>
          <Pencil
            width={width < 360 ? 12 : width < 768 ? 14 : width < 1024 ? 16 : 20}
            height={width < 360 ? 12 : width < 768 ? 14 : width < 1024 ? 16 : 20}
            aria-hidden="true"
          />
        </div>

        <div className={styles.userNameContainer} onClick={openRenameModal}>
          <h1 className={styles.userName}>Команда {currentName}</h1>
          <Pencil
            width={width < 480 ? 12 : width < 768 ? 14 : width < 1024 ? 16 : 20}
            height={width < 480 ? 12 : width < 768 ? 14 : width < 1024 ? 16 : 20}
            aria-hidden="true"
          />
        </div>

        <div className={styles.userInfoHeader}>
          <img
            src={profilePhoto}
            alt="avatar"
            className={styles.profilePhotoPlaceholder}
          />
          <div className={styles.textContent}>
            <p className={styles.details}>Ментор команды</p>
            <p className={styles.nameMentor}>Иванов Иван Иванович</p>
          </div>
        </div>
      </div>

      <InputModal
        title="Изменение названия команды"
        placeholder="Новое название"
        createText="Изменить"
        cancelText="Отменить"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inputData={newName}
        error={error}
        onChangeInputData={(value) => {
          setNewName(value);
          setError("");
        }}
        onConfirm={handleRename}
      />
    </>
  );
};

export default TeamHeader;
