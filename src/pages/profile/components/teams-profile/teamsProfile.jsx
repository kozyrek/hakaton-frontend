import { useEffect, useState } from "react";
import styles from "./teamsProfile.module.css";
import Button from "../../../../components/button/button";
import ModalWindow from "../../../../components/modalWindow";
import Card from "../../ui/card/Card";
import ModalWrapper from "../../../../components/modalOverlay";
import getAllTeams from "../../../../api/team/getAllTeam";
import getTeamById from "../../../../api/team/getTeamById";
import Inputs from "../../../../components/inputs/inputs";
import createTeam from "../../../../api/team/createTeam";
import deleteTeam from "../../../../api/team/deleteTeam";
import Loader from "../../../../components/loader/loader";
import { useNavigate } from "react-router-dom";

const TeamsProfile = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myTeams");
  const [myTeamsState, setMyTeamsState] = useState([]);
  const [allTeamsState, setAllTeamsState] = useState([]);
  const [userTeam, setUserTeam] = useState(null);
  const [isCreateTeam, setIsCreateTeam] = useState(false);
  const [isDeleteTeam, setIsDeleteTeam] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false); // ДОБАВЛЕНО: флаг завершения загрузки
  const [formData, setFormData] = useState({
    teamName: { value: "", type: "text" },
  });
  const [formError, setFormError] = useState({
    teamName: "",
  });

  const isMentor = user?.isMentor;
  const isAdmin = user?.mentor?.isAdmin;
  const userTeamId = user?.teamId;

  const menuItems = [
    { key: "myTeams", label: "Мои команды" },
    { key: "allTeams", label: "Все команды" },
  ];

  const fetchAllTeams = async () => {
    try {
      const response = await getAllTeams();
      setAllTeamsState(response.items || []);
      
      if (isMentor || isAdmin) {
        setMyTeamsState(response.items || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserTeam = async () => {
    if (!userTeamId) {
      setUserTeam(null);
      setMyTeamsState([]); // Убедимся, что массив пустой
      return;
    }

    try {
      const team = await getTeamById(userTeamId);
      setUserTeam(team);
      setMyTeamsState([team]);
    } catch (error) {
      console.error("Ошибка при загрузке команды пользователя:", error);
      setUserTeam(null);
      setMyTeamsState([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      if (isMentor || isAdmin) {
        await fetchAllTeams();
      } else {
        await fetchUserTeam();
      }
      
      setIsLoading(false);
      setHasFetched(true); // ДОБАВЛЕНО: отмечаем, что загрузка завершена
    };

    fetchData();
  }, [userTeamId, isMentor, isAdmin]);

  const handleCreateTeam = async (teamName) => {
    try {
      const response = await createTeam(teamName);
      if (response.status === 201) {
        await fetchAllTeams();
        setIsCreateTeam(false);
        setFormData({ teamName: { value: "", type: "text" } });
      }
    } catch (error) {
      console.error("Ошибка при создании команды:", error);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      const response = await deleteTeam(teamId);
      if (response.status === 204) {
        if (isMentor || isAdmin) {
          await fetchAllTeams();
        } else {
          await fetchUserTeam();
        }
        setIsDeleteTeam(false);
      }
    } catch (error) {
      console.error("Ошибка при удалении команды:", error);
    }
  };

  const handleChange = (value, name = "teamName") => {
    setFormData({
      ...formData,
      [name]: { value: value, type: "text" },
    });
  };

  const handleCardClick = (teamId) => {
    navigate(`/team/${teamId}`);
  };

  // Рендер для участника (не ментора)
  const renderParticipantView = () => {
    if (isLoading) {
      return <Loader />;
    }

    // ИСПРАВЛЕНИЕ: Проверяем, есть ли команда у пользователя
    // Учитываем, что загрузка завершена и userTeam может быть null
    if (userTeam) {
      return (
        <div className={styles.cardsContainer}>
          <Card
            key={userTeam.id}
            team={userTeam}
            onClick={() => handleCardClick(userTeam.id)}
          />
        </div>
      );
    } else {
      // ИСПРАВЛЕНИЕ: Показываем сообщение только если загрузка завершена и команды нет
      return (
        <div className={styles.emptyState}>
          <p>Вы не состоите в команде</p>
        </div>
      );
    }
  };

  // Рендер для ментора/админа
  const renderMentorView = () => {
    if (isLoading) {
      return <Loader />;
    }

    const teamsToShow = activeTab === "myTeams" ? myTeamsState : allTeamsState;

    return (
      <>
        <div className={styles.profileMenu}>
          {menuItems.map(({ key, label }) => (
            <Button
              key={key}
              bigmenu
              text={label}
              isActive={activeTab === key}
              onClick={() => setActiveTab(key)}
            />
          ))}
        </div>

        <div className={styles.cardsContainer}>
          {teamsToShow.length > 0 ? (
            teamsToShow.map((team) => (
              <Card
                key={team.id}
                team={team}
                onDelete={() => setIsDeleteTeam({ id: team.id })}
                onClick={() => handleCardClick(team.id)}
                logoVariant={activeTab === "allTeams" ? "default" : undefined}
              />
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>Пока ни одной команды не добавлено</p>
            </div>
          )}
        </div>

        <div className={styles.createButton}>
          <Button
            large
            text="Создать команду"
            onClick={() => setIsCreateTeam(true)}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <h2 className="titleH2">Команды</h2>
      
      {isMentor || isAdmin ? renderMentorView() : renderParticipantView()}

      {/* Модальные окна показываем только менторам/админам */}
      {(isMentor || isAdmin) && (
        <>
          <ModalWrapper
            isOpen={isCreateTeam}
            onClose={() => setIsCreateTeam(false)}
          >
            <ModalWindow
              title="Создание новой команды"
              buttonArea={[
                <Button
                  text="Создать"
                  onClick={() => handleCreateTeam(formData.teamName.value)}
                />,
                <Button
                  violet
                  text="Отменить"
                  onClick={() => {
                    setFormData({ teamName: { value: "", type: "text" } });
                    setIsCreateTeam(false);
                  }}
                />,
              ]}
            >
              <Inputs
                name="teamName"
                type="text"
                formData={formData}
                formError={formError}
                placeholder="Название"
                onChange={handleChange}
              />
            </ModalWindow>
          </ModalWrapper>

          <ModalWrapper
            isOpen={isDeleteTeam}
            onClose={() => setIsDeleteTeam(false)}
          >
            <ModalWindow
              title="Вы хотите удалить данную команду?"
              buttonArea={[
                <Button
                  text="Да"
                  onClick={() => handleDeleteTeam(isDeleteTeam.id)}
                />,
                <Button
                  violet
                  text="Нет"
                  onClick={() => setIsDeleteTeam(false)}
                />,
              ]}
            />
          </ModalWrapper>
        </>
      )}
    </>
  );
};

export default TeamsProfile;