import { useState, useMemo, useEffect, useCallback } from "react";
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

// ДОБАВЛЕНО: кастомный хук дебаунса
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const TeamMembers = ({ members, onTeamUpdate }) => {
  const { teamId } = useParams();
  const [isEditRoleOpen, setEditRoleOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isAddMemberOpen, setAddMemberOpen] = useState(false);
  const [isLimitReachedOpen, setLimitReachedOpen] = useState(false);
  const [isAddSuccessOpen, setAddSuccessOpen] = useState(false);
  const [participantWithoutTeam, setParticipantWithoutTeam] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [roleInput, setRoleInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const width = useResize();

  // ДОБАВЛЕНО: использование дебаунса для поискового запроса
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // ИСПРАВЛЕНО: правильная фильтрация пользователей на основе структуры из Swagger
  const filteredParticipants = useMemo(() => {
    console.log('Все пользователи для фильтрации:', participantWithoutTeam);
    console.log('Поисковый запрос:', debouncedSearchQuery);

    if (!debouncedSearchQuery.trim()) {
      return participantWithoutTeam;
    }
    
    const query = debouncedSearchQuery.toLowerCase().trim();
    return participantWithoutTeam.filter(user => {
      // ИСПРАВЛЕНО: правильное извлечение данных из структуры Swagger
      const firstName = (user.firstName || '').toLowerCase();
      const lastName = (user.lastName || '').toLowerCase();
      const fullName = `${firstName} ${lastName}`.toLowerCase();
      const email = (user.email || '').toLowerCase();

      console.log('Проверка пользователя:', { 
        id: user.id, 
        firstName, 
        lastName, 
        fullName, 
        email,
        query 
      });

      return fullName.includes(query) || 
             firstName.includes(query) || 
             lastName.includes(query) ||
             email.includes(query);
    });
  }, [participantWithoutTeam, debouncedSearchQuery]);

  console.log('Отфильтрованные пользователи:', filteredParticipants);

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

  // ИСПРАВЛЕНО: функция загрузки пользователей с серверным поиском
  const fetchParticipants = useCallback(async (search = '') => {
    try {
      console.log("Загрузка пользователей без команды с поиском:", search);
      const params = {
        is_team_member: false,
        is_mentor: false,
      };
      
      // Добавляем поиск только если есть поисковый запрос
      if (search.trim()) {
        params.search = search;
      }
      
      const response = await getAllUser(params);
      console.log("Полученные пользователи:", response);
      
      // ИСПРАВЛЕНО: правильное извлечение items из ответа
      const users = response.items || response || [];
      setParticipantWithoutTeam(users);
      setSelectedParticipants([]);
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
      setParticipantWithoutTeam([]);
    }
  }, []);

  // ИСПРАВЛЕНО: загрузка пользователей при открытии модального окна и при изменении поиска
  useEffect(() => {
    if (isAddMemberOpen) {
      if (debouncedSearchQuery.trim()) {
        // Если есть поисковый запрос, делаем поиск на сервере
        fetchParticipants(debouncedSearchQuery);
      } else {
        // Если нет поискового запроса, загружаем всех пользователей
        fetchParticipants();
      }
    }
  }, [isAddMemberOpen, debouncedSearchQuery, fetchParticipants]);

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
      
      setAddSuccessOpen(true);
    } catch (error) {
      console.error("Ошибка при добавлении участников:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSingleMember = async (user) => {
    setIsLoading(true);
    try {
      await addMembers(teamId, [
        {
          participantId: user.id
        }
      ]);
      
      await fetchTeamData();
      // Перезагружаем список пользователей после добавления
      fetchParticipants(debouncedSearchQuery);
      
      setAddSuccessOpen(true);
    } catch (error) {
      console.error("Ошибка при добавлении участника:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ИСПРАВЛЕНО: обработчик чекбокса
  const handleCheckboxChange = useCallback((participantId, isChecked) => {
    setSelectedParticipants(prev => {
      if (isChecked) {
        return [...prev, participantId];
      } else {
        return prev.filter(id => id !== participantId);
      }
    });
  }, []);

  const handleDeleteClick = async (teamId, memberId) => {
    setIsLoading(true);
    try {
      await deleteMembers(teamId, memberId);
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
      setSearchQuery(""); // Сброс поиска при открытии модального окна
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

  // ИСПРАВЛЕНО: обработчик изменения поискового запроса
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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
            <SearchInput 
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Поиск по имени, фамилии или email..."
            />
            <div className={styles.modalParticipantsList}>
              {filteredParticipants.length > 0 ? (
                filteredParticipants.map((user, index) => (
                  <UserDisplay
                    key={user.id || `user-${index}`}
                    item={user} // Передаем объект пользователя напрямую
                    onSubmit={() => handleAddSingleMember(user)}
                    onCheckboxChange={(isChecked) => handleCheckboxChange(user.id, isChecked)}
                    isChecked={selectedParticipants.includes(user.id)}
                    disabled={isLoading}
                  />
                ))
              ) : (
                <div className={styles.noResults}>
                  {searchQuery ? "Ничего не найдено" : "Нет доступных участников"}
                </div>
              )}
            </div>
          </ModalWindow>
        </ModalWrapper>

        {/* Модальное окно успешного добавления */}
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

        {/* Остальные модальные окна */}
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