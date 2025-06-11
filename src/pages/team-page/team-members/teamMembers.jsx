import { useState, useMemo, useEffect } from "react";
// import ROUTES from "../../../../../utils/constants";
import Button from "../../../components/button/button";
import Pencil from "../../profile/components/personal-info/images/Pencil";
import { useResize } from "../../../hooks/useResize";
import { useParams } from "react-router-dom";
import LeaderLogo from "../images/LeaderLogo";
import SearchInput from "../../profile/ui/searchInput/searchInput";
import ModalWrapper from "../../../components/modalOverlay";
import ModalWindow from "../../../components/modalWindow";

import styles from "./teamMembers.module.css";
import UserDisplay from "../../profile/components/teams-profile/teamMembers/components/user-display/UserDisplay";
import addMembers from "../../../api/team/addMembers";
import getAllUser from "../../../api/getAllUsers";
import deleteMembers from "../../../api/team/deleteMembers";

// import {
//   ConfirmDeleteModal,
//   InputModal,
//   AddMemberInTeam,
//   MessageModal,
// } from "../../../profileModals/ModalsList";

const TeamMembers = ({ members }) => {
  const { teamId } = useParams();
  const [isEditRoleOpen, setEditRoleOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isAddMemberOpen, setAddMemberOpen] = useState(false);
  const [isLimitReachedOpen, setLimitReachedOpen] = useState(false);
  const [participantWithoutTeam, setParticipantWithoutTeam] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [roleInput, setRoleInput] = useState("");

  const width = useResize();

  const fetchParticipant = async () => {
    const response = await getAllUser({
      is_team_member: false,
      is_mentor: false,
    });
    setParticipantWithoutTeam(response.items);
  };
  useEffect(() => {
    if (isAddMemberOpen) fetchParticipant();
  }, [isAddMemberOpen]);

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

  const handleDeleteClick = async (teamId, memberId) => {
    const response = await deleteMembers(teamId, memberId);
    setDeleteOpen(true);
  };

  const handleAddMemberClick = () => {
    if (members.length >= 10) {
      setLimitReachedOpen(true);
    } else {
      setAddMemberOpen(true);
    }
  };

  const handleAddMember = async (item) => {
    const response = await addMembers(teamId, [
      {
        participantId: item.participant.id,
      },
    ]);
    fetchParticipant();
  };

  const handleRoleClick = (member, idx, e) => {
    e.stopPropagation();
    setEditingIndex(idx);
    setRoleInput(member.roleName);
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
    // setMembers((prev) =>
    //   prev.map((m, i) => ({
    //     ...m,
    //     role:
    //       i === idx ? "капитан" : m.role === "капитан" ? "участник" : m.role,
    //   }))
    // );
  };

  return (
    <>
      <div className={`contentBox ${styles.participantsBlock}`}>
        <h2 className="titleH2">Участники команды</h2>

        <ul className={styles.participantsList}>
          {members.map((member) => (
            <li
              key={member.id}
              className={`${styles.participantItem} ${
                member.roleName === "капитан" ? styles.isActive : ""
              }`}
            >
              <div className={styles.participantInfo}>
                <p className={`text3 ${styles.participantName}`}>
                  {member.lastName} {member.firstName}
                </p>
                <div
                  className={styles.roleContainer}
                  onClick={(e) => handleRoleClick(member, member.id, e)}
                >
                  <p className={`text1 ${styles.participantRole}`}>
                    {member.roleName}
                  </p>
                  <Pencil
                    width={width < 769 ? 12 : 18}
                    height={width < 769 ? 12 : 18}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div
                className={
                  member.roleName === "капитан"
                    ? `${styles.rightZone} ${styles.rightZoneCaptain}`
                    : styles.rightZone
                }
              >
                {member.roleName === "капитан" ? (
                  <LeaderLogo />
                ) : (
                  <button
                    className={`text2 ${styles.textBtn}`}
                    onClick={(e) => handleMakeCaptain(member.id, e)}
                  >
                    Сделать&nbsp;капитаном
                  </button>
                )}
              </div>
              <button
                className={`text2 ${styles.textBtn}`}
                onClick={(e) => handleDeleteClick(teamId, member.id)}
              >
                Удалить&nbsp;участника
              </button>
            </li>
          ))}
        </ul>

        <Button
          large
          text="Добавить участника"
          onClick={handleAddMemberClick}
        />

        {/* Модальное окно не работает */}
        <ModalWrapper
          isOpen={isAddMemberOpen}
          onClose={() => setAddMemberOpen(false)}
        >
          <ModalWindow
            title="Добавить участника"
            buttonArea={[<Button text="Добавить выбранных" />]}
            // onClick={}
          >
            <SearchInput />
            <div style={{ marginTop: "28px" }}>
              {participantWithoutTeam.map((item) => (
                <UserDisplay
                  key={item.id}
                  item={item}
                  onSubmit={handleAddMember}
                />
              ))}
            </div>
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
    </>
  );
};

export default TeamMembers;
