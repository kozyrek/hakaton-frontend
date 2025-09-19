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
import changeRole from "../../../api/team/changeRole";
import getTeamById from "../../../api/team/getTeamById";

// import {
//   ConfirmDeleteModal,
//   InputModal,
//   AddMemberInTeam,
//   MessageModal,
// } from "../../../profileModals/ModalsList";

const TeamMembers = ({ members, onTeamUpdate }) => {
  const { teamId } = useParams();
  const [isEditRoleOpen, setEditRoleOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isAddMemberOpen, setAddMemberOpen] = useState(false);
  const [isLimitReachedOpen, setLimitReachedOpen] = useState(false);
  const [participantWithoutTeam, setParticipantWithoutTeam] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [roleInput, setRoleInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const width = useResize();

  const fetchTeamData = async () => {
    try {
      const teamData = await getTeamById(teamId);
      if (onTeamUpdate) {
        onTeamUpdate(teamData);
      }
    } catch (error) {
      console.error("Ошибка при получении данных команды:", error);
    }
  };

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

  const handleDeleteClick = async (teamId, memberId) => {
    setIsLoading(true);
    try {
      await deleteMembers(teamId, memberId);
      setDeleteOpen(true);
      // Обновляем данные команды после удаления участника
      await fetchTeamData();
    } catch (error) {
      console.error("Ошибка при удалении участника:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMemberClick = () => {
    if (members.length >= 10) {
      setLimitReachedOpen(true);
    } else {
      setAddMemberOpen(true);
    }
  };

  const handleAddMember = async (item) => {
    setIsLoading(true);
    try {
      await addMembers(teamId, [
        {
          participantId: item.participant.id,
        },
      ]);
      fetchParticipant();
      // Обновляем данные команды после добавления участника
      await fetchTeamData();
    } catch (error) {
      console.error("Ошибка при добавлении участника:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleClick = (member, idx, e) => {
    e.stopPropagation();
    setEditingIndex(idx);
    setRoleInput(member.roleName);
    setEditRoleOpen(true);
  };

  const handleMakeCaptain = async (memberId, e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      await changeRole(teamId, memberId, "капитан");
      // Обновляем данные команды после изменения роли
      await fetchTeamData();
    } catch (error) {
      console.error("Ошибка при изменении роли:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmRoleEdit = async () => {
    if (!roleInput.trim() || editingIndex === null) return;
    
    setIsLoading(true);
    try {
      await changeRole(teamId, editingIndex, roleInput.trim());
      setEditRoleOpen(false);
      setEditingIndex(null);
      // Обновляем данные команды после изменения роли
      await fetchTeamData();
    } catch (error) {
      console.error("Ошибка при изменении роли:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`contentBox ${styles.participantsBlock}`}>
        <h2 className="titleH2">Участники команды</h2>

        <ul className={styles.participantsList}>
          {members.map((member, index) => (
            <li
              key={member.id || `member-${index}`} // Добавлен ключ
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
                    disabled={isLoading}
                  >
                    Сделать&nbsp;капитаном
                  </button>
                )}
              </div>
              <button
                className={`text2 ${styles.textBtn}`}
                onClick={(e) => handleDeleteClick(teamId, member.id)}
                disabled={isLoading}
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
          disabled={isLoading}
        />

        {/* Модальное окно не работает */}
        <ModalWrapper
          isOpen={isAddMemberOpen}
          onClose={() => setAddMemberOpen(false)}
        >
          <ModalWindow
            title="Добавить участника"
            buttonArea={[<Button text="Добавить выбранных" disabled={isLoading} />]}
            // onClick={}
          >
            <SearchInput />
            <div style={{ marginTop: "28px" }}>
              {participantWithoutTeam.map((item, index) => (
                <UserDisplay
                  key={item.id || `participant-${index}`} // Добавлен ключ
                  item={item}
                  onSubmit={handleAddMember}
                  disabled={isLoading}
                />
              ))}
            </div>
          </ModalWindow>
        </ModalWrapper>

        {/* Модальное окно для изменения роли */}
        <ModalWrapper
          isOpen={isEditRoleOpen}
          onClose={() => setEditRoleOpen(false)}
        >
          <ModalWindow
            title="Изменить роль участника"
            buttonArea={[
              <Button 
                text="Отменить" 
                onClick={() => setEditRoleOpen(false)} 
                disabled={isLoading}
              />,
              <Button 
                text="Сохранить" 
                onClick={confirmRoleEdit} 
                disabled={isLoading}
              />
            ]}
          >
            <input
              type="text"
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              placeholder="Новая роль"
              disabled={isLoading}
              className={styles.roleInput}
            />
          </ModalWindow>
        </ModalWrapper>

        {/* Модальное окно для подтверждения удаления */}
        <ModalWrapper
          isOpen={isDeleteOpen}
          onClose={() => setDeleteOpen(false)}
        >
          <ModalWindow
            title="Участник удален"
            buttonArea={[
              <Button 
                text="ОК" 
                onClick={() => setDeleteOpen(false)} 
              />
            ]}
          >
            <p>Участник успешно удален из команды.</p>
          </ModalWindow>
        </ModalWrapper>

        {/* Модальное окно для ограничения участников */}
        <ModalWrapper
          isOpen={isLimitReachedOpen}
          onClose={() => setLimitReachedOpen(false)}
        >
          <ModalWindow
            title="Достигнут лимит участников"
            buttonArea={[
              <Button 
                text="ОК" 
                onClick={() => setLimitReachedOpen(false)} 
              />
            ]}
          >
            <p>Команда уже содержит максимальное количество участников (10).</p>
          </ModalWindow>
        </ModalWrapper>
      </div>
    </>
  );
};

export default TeamMembers;