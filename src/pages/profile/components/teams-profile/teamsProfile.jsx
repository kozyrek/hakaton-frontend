import { useEffect, useState } from "react";
import styles from "./teamsProfile.module.css";
import Button from "../../../../components/button/button";
import ModalWindow from "../../../../components/modalWindow";
import Card from "../../ui/card/Card";
import ModalWrapper from "../../../../components/modalOverlay";
import getAllTeams from "../../../../api/team/getAllTeam";
import Inputs from "../../../../components/inputs/inputs";
import createTeam from "../../../../api/team/createTeam";
import deleteTeam from "../../../../api/team/deleteTeam";
// import { useNavigate } from "react-router-dom";

const TeamsProfile = () => {
  const [activeTab, setActiveTab] = useState("myTeams");
  const [myTeamsState, setMyTeamsState] = useState([]);
  const [allTeamsState, _] = useState([]);
  const [isCreateTeam, setIsCreateTeam] = useState(false);
  const [isDeleteTeam, setIsDeleteTeam] = useState(false);
  // const navigate = useNavigate()
  const [formData, setFormData] = useState({
    teamName: { value: "", type: "text" },
  });
  const [formError, setFormError] = useState({
    teamName: "",
  });

  const menuItems = [
    { key: "myTeams", label: "Мои команды" },
    { key: "allTeams", label: "Все команды" },
  ];

  const fetchProjects = async () => {
    try {
      const response = await getAllTeams();
      setMyTeamsState(response.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateTeame = async (teamName) => {
    const response = await createTeam(teamName);
    if (response.status === 201) {
      fetchProjects();
      setIsCreateTeam(false);
    }
  };

  const handleDeleteTeam = async (isDeleteTeam) => {
    const response = await deleteTeam(isDeleteTeam);
    if (response.status === 204) {
      fetchProjects();
      setIsDeleteTeam(false);
    }
  };
  const handleChange = (value, name = "teamName") => {
    setFormData({
      ...formData,
      [name]: { value: value, type: "text" },
    });
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
          {myTeamsState.map((team) => (
              <Card
                key={team.id}
                team={team}
                onDelete={() => setIsDeleteTeam({ id: team.id })}
                // onClick={() => navigate(`/team/${team.id}`)}
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
              onDelete={() => handleDeleteTeam(team.id)}
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

      <ModalWrapper
        isOpen={isCreateTeam}
        onClose={() => setIsCreateTeam(false)}
      >
        <ModalWindow
          title="Создание новой команды"
          buttonArea={[
            <Button
              text="Создать"
              onClick={() => handleCreateTeame(formData.teamName.value)}
            />,
            <Button
              violet
              text="Отменить"
              onClick={() => {
                handleChange("");
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
    </div>
  );
};

export default TeamsProfile;
