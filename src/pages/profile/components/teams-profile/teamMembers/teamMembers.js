import React, { useState, useMemo } from "react";
import styles from "./teamMembers.module.css";
// import LeaderLogo from "./leaderLogo";
// import TextButton from "../../../../ui/textButton/textButton";
// import Button from "../../../../../../components/button/button";
// import Pencil from "../../../personal-info/images/Pencil";
// import data from "../../../../data.json";
// import { useResize } from "../../../../../../hooks/useResize";
import Button from "../../../../../components/button/button";
import Pencil from "../../personal-info/images/Pencil";
import { useResize } from "../../../../../hooks/useResize";
import { useParams } from "react-router-dom";
import getTeamById from "../../../../../api/team/getTeamById";
import SearchInput from "../../../ui/searchInput/searchInput";
import ModalWrapper from "../../../../../components/modalOverlay";
import ModalWindow from "../../../../../components/modalWindow";
// import {
//   ConfirmDeleteModal,
//   InputModal,
//   AddMemberInTeam,
//   MessageModal,
// } from "../../../profileModals/ModalsList";

const TeamMembers = () => {
  const { teamId } = useParams();
  const [members, setMembers] = useState([]);
  const [isEditRoleOpen, setEditRoleOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isAddMemberOpen, setAddMemberOpen] = useState(false);
  const [isLimitReachedOpen, setLimitReachedOpen] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [roleInput, setRoleInput] = useState("");

  const width = useResize();

  useState(() => {
    const fetchTeamMembers = async (teamId) => {
      const response = await getTeamById(teamId);
      setMembers(response.teamMembers);
    };
    fetchTeamMembers(teamId);
    console.log("mount", teamId);
  }, []);

  // const modalList = useMemo(
  //   () =>
  //     [].map((item, idx) => ({
  //       id: item.id ?? idx,
  //       name: item.name ?? item.full_name,
  //       role: item.role,
  //     })),
  //   []
  // );

  // const handleAddSelected = (ids) => {
  //   const toAdd = modalList
  //     .filter((p) => ids.includes(p.id))
  //     .map((p) => ({ full_name: p.name, role: "участник" }));

  //   if (members.length + toAdd.length > 10) {
  //     setLimitReachedOpen(true);
  //     return;
  //   }

  //   setMembers((prev) => [...prev, ...toAdd]);
  //   setAddMemberOpen(false);
  // };

  // const confirmDelete = () => {
  //   if (selectedIndex !== null) {
  //     setMembers((prev) => prev.filter((_, i) => i !== selectedIndex));
  //   }
  //   setDeleteOpen(false);
  //   setSelectedIndex(null);
  // };

  const handleDeleteClick = (idx, e) => {
    e.stopPropagation();
    setSelectedIndex(idx);
    setDeleteOpen(true);
  };

  const handleAddMemberClick = () => {
    if (members.length >= 10) {
      setLimitReachedOpen(true);
    } else {
      setAddMemberOpen(true);
    }
  };

  const handleRoleClick = (member, idx, e) => {
    e.stopPropagation();
    setEditingIndex(idx);
    setRoleInput(member.role);
    setEditRoleOpen(true);
  };

  // const confirmRoleEdit = () => {
  //   const newRole = roleInput.trim();
  //   if (!newRole) return;
  //   setMembers((prev) =>
  //     prev.map((m, i) => (i === editingIndex ? { ...m, role: newRole } : m))
  //   );
  //   setEditRoleOpen(false);
  //   setEditingIndex(null);
  // };

  const handleMakeCaptain = (idx, e) => {
    e.stopPropagation();
    setMembers((prev) =>
      prev.map((m, i) => ({
        ...m,
        role:
          i === idx ? "капитан" : m.role === "капитан" ? "участник" : m.role,
      }))
    );
  };

  return (
    <div
      className={styles.participantsList}
      style={{ marginTop: "60px" }}
    >
      <h2 className={styles.profileTabTitle}>Участники команды</h2>

      <ul className={styles.participantsListContainer}>
        {members.map((member, idx) => (
          <li
            key={idx}
            className={
              member.role === "капитан"
                ? styles.participantItemActive
                : styles.participantItem
            }
          >
            <div className={styles.participantInfo}>
              <p className={styles.participantName}>{member.full_name}</p>
              <div
                className={styles.roleContainer}
                onClick={(e) => handleRoleClick(member, idx, e)}
              >
                <p className={styles.participantRole}>{member.role}</p>
                <Pencil
                  width={width < 769 ? 12 : 18}
                  height={width < 769 ? 12 : 18}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div
              className={
                member.role === "капитан"
                  ? `${styles.rightZone} ${styles.rightZoneCaptain}`
                  : styles.rightZone
              }
            >
              {member.role === "капитан" &&
                // <LeaderLogo />
                "sad"}
              {member.role !== "капитан" && (
                <Button
                  addClass={styles.textBtn}
                  onClick={(e) => handleMakeCaptain(idx, e)}
                >
                  Сделать капитаном
                </Button>
              )}
              <Button
                className={styles.textBtn}
                onClick={(e) => handleDeleteClick(idx, e)}
              >
                Удалить участника
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.buttonsContainer}>
        <Button
          text="Добавить участника"
          onClick={handleAddMemberClick}
        />
      </div>
      <ModalWrapper
        isOpen={isAddMemberOpen}
        onClose={() => setAddMemberOpen(false)}
      >
        <ModalWindow title="Создание новой команды">
          <SearchInput />
          <li
            key={participant.id}
            className={`${styles.participantItem} ${
              !participant.verified && styles.notVerified
            }`}
          >
            <div className={`${styles.participantInfo}`}>
              <Link
                to={`${ROUTES.PROFILE}/${participant.id}`}
                className={styles.link}
              >
                {participant.lastName} &nbsp;
                {participant.firstName} &nbsp;
                {participant.patronymic}
              </Link>
            </div>
            <div>
              <DeleteButton
                className={styles.removeButton}
                onClick={() => openModal(participant)}
              >
                Удалить
              </DeleteButton>
            </div>
          </li>
        </ModalWindow>
      </ModalWrapper>
      {/* 
      <InputModal
        title="Изменить роль участника"
        placeholder="Новая роль"
        cancelText="Отменить"
        createText="Сохранить"
        isOpen={isEditRoleOpen}
        onClose={() => setEditRoleOpen(false)}
        inputData={roleInput}
        error=""
        onChangeInputData={setRoleInput}
        onConfirm={confirmRoleEdit}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Действительно хотите удалить данного участника из команды?"
        description={
          selectedIndex !== null ? members[selectedIndex].full_name : ""
        }
      />

      <AddMemberInTeam
        title="Добавить участника"
        isOpen={isAddMemberOpen}
        onClose={() => setAddMemberOpen(false)}
        list={modalList}
        onAddSelected={handleAddSelected}
      />
      <MessageModal
        title="Добавление невозможно. Команда уже содержит 10 участников"
        isOpen={isLimitReachedOpen}
        onClose={() => setLimitReachedOpen(false)}
      /> */}
    </div>
  );
};

export default TeamMembers;
