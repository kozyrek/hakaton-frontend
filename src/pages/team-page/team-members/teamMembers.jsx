import { useState, useMemo, useEffect } from "react";
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

const TeamMembers = ({ members, onTeamUpdate }) => {
  const { teamId } = useParams();
  const [isEditRoleOpen, setEditRoleOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isAddMemberOpen, setAddMemberOpen] = useState(false);
  const [isLimitReachedOpen, setLimitReachedOpen] = useState(false);
  const [isAddSuccessOpen, setAddSuccessOpen] = useState(false); // ДОБАВЛЕНО: для успешного добавления
  const [participantWithoutTeam, setParticipantWithoutTeam] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [roleInput, setRoleInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [selectedParticipants, setSelectedParticipants] = useState([]);

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
    setSelectedParticipants([]);
  };
  
  useEffect(() => {
    if (isAddMemberOpen) fetchParticipant();
  }, [isAddMemberOpen]);

  // ИСПРАВЛЕНО: обработчик добавления выбранных участников
  const handleAddSelectedMembers = async () => {
    console.log("Добавление выбранных участников:", selectedParticipants);
    
    if (selectedParticipants.length === 0) {
      console.log("Нет выбранных участников для добавления");
      return;
    }
    
    setIsLoading(true);
    try {
      const membersToAdd = selectedParticipants.map(participantId => ({
        participantId: participantId
      }));

      console.log("Данные для отправки:", membersToAdd);
      
      await addMembers(teamId, membersToAdd);
      
      setAddMemberOpen(false);
      await fetchTeamData();
      
      // ИСПРАВЛЕНО: показываем окно успешного добавления вместо удаления
      setAddSuccessOpen(true);
    } catch (error) {
      console.error("Ошибка при добавлении участников:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ИСПРАВЛЕНО: обработчик одиночного добавления
  const handleAddSingleMember = async (item) => {
    setIsLoading(true);
    try {
      await addMembers(teamId, [
        {
          participantId: item.participant.id
        }
      ]);
      
      await fetchTeamData();
      await fetchParticipant();
      
      // ИСПРАВЛЕНО: показываем окно успешного добавления
      setAddSuccessOpen(true);
    } catch (error) {
      console.error("Ошибка при добавлении участника:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSelect = (participantId) => {
    setSelectedParticipants(prev => {
      if (prev.includes(participantId)) {
        return prev.filter(id => id !== participantId);
      } else {
        return [...prev, participantId];
      }
    });
  };

  const handleCheckboxChange = (participantId, isChecked) => {
    setSelectedParticipants(prev => {
      if (isChecked) {
        return [...prev, participantId];
      } else {
        return prev.filter(id => id !== participantId);
      }
    });
  };

  // ИСПРАВЛЕНО: обработчик удаления участника
  const handleDeleteClick = async (teamId, memberId) => {
    setIsLoading(true);
    try {
      await deleteMembers(teamId, memberId);
      // ИСПРАВЛЕНО: показываем окно удаления
      setDeleteOpen(true);
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
              key={member.id || `member-${index}`}
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
                onClick={() => handleDeleteClick(teamId, member.id)}
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

        {/* Модальное окно добавления участников */}
        <ModalWrapper
          isOpen={isAddMemberOpen}
          onClose={() => setAddMemberOpen(false)}
        >
          <ModalWindow
            title="Добавить участника"
            buttonArea={[
              <Button 
                text={`Добавить выбранных (${selectedParticipants.length})`} 
                onClick={handleAddSelectedMembers}
                disabled={isLoading || selectedParticipants.length === 0}
              />
            ]}
          >
            <SearchInput />
            <div style={{ marginTop: "28px" }}>
              {participantWithoutTeam.map((item, index) => (
                <UserDisplay
                  key={item.id || `participant-${index}`}
                  item={item}
                  onSubmit={handleAddSingleMember}
                  onCheckboxChange={(isChecked) => handleCheckboxChange(item.participant.id, isChecked)}
                  isChecked={selectedParticipants.includes(item.participant.id)}
                  disabled={isLoading}
                />
              ))}
            </div>
          </ModalWindow>
        </ModalWrapper>

        {/* ДОБАВЛЕНО: Модальное окно успешного добавления */}
        <ModalWrapper
          isOpen={isAddSuccessOpen}
          onClose={() => setAddSuccessOpen(false)}
        >
          <ModalWindow
            title="Участники добавлены"
            buttonArea={[
              <Button 
                text="ОК" 
                onClick={() => setAddSuccessOpen(false)} 
              />
            ]}
          >
            <p>Участник(и) успешно добавлены в команду.</p>
          </ModalWindow>
        </ModalWrapper>

        {/* Модальное окно удаления участника */}
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

        {/* Остальные модальные окна без изменений */}
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