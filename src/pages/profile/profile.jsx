import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import LayoutProfileBg from "./styles/layoutProfileBg";
import styles from "./styles/profile.module.css";
import ProfileForm from "./components/profile-form/ProfileForm";
import ProfileHeader from "./components/head-profile/profileHeader";
import ProfileMenu from "./components/profile-menu/ProfileMenu";
import ProfileMembers from "./components/list-members/profileMembers";
import TeamsProfile from "./components/teams-profile/teamsProfile";
import ProjectsProfile from "./components/projects-profile/projectsProfile";
import PersonalInfo from "./components/personal-info";
import { useDispatch, useSelector } from "react-redux";
import { 
  logout, 
  update_user, 
  update_user_participant, 
  update_user_mentor, 
  increment_photo_version 
} from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";
import { HTTP } from "../../api/http";
import { toast } from "react-toastify";
import  getUser  from "../../api/getUser";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [participants, setParticipants] = useState();
  const [myTeams] = useState();
  const [allTeams] = useState();
  const [projects] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [editRegInfo, setEditRegInfo] = useState(false);
  const [hasLoadedUserData, setHasLoadedUserData] = useState(false);
  
  // Исправленный эффект для загрузки данных пользователя
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Загружаем данные только если они еще не загружены и отсутствуют необходимые поля
        const currentUser = user.user || user;
        if (!hasLoadedUserData && (!currentUser?.phoneNumber || !currentUser?.eduOrganization)) {
          const userData = await getUser();
          console.log("Загруженные данные пользователя:", userData);
          dispatch(update_user(userData));
          setHasLoadedUserData(true);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных пользователя:", error);
        setHasLoadedUserData(true); // Все равно помечаем как загруженное, чтобы не повторять
      }
    };

    loadUserData();
  }, [dispatch, user, hasLoadedUserData]); // Убрали user.user из зависимостей

  const handleTabChange = (tab) => {
    setEditRegInfo(false);
    setActiveTab(tab);
  };
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleRemoveParticipant = (index) => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  };

  // Функция сохранения профиля
  const handleSaveProfile = async (formData) => {
    try {
      console.log("Отправка данных профиля:", formData);
      
      // Проверим содержимое FormData
      console.log("FormData содержимое:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
      // Получаем ID пользователя - используем user.user.id или user.id
      const currentUser = user.user || user;
      const userId = currentUser?.id;
      console.log("User ID для запроса:", userId);
      
      if (!userId) {
        throw new Error("ID пользователя не найден");
      }
      
      // Используем конкретный ID пользователя вместо 'me'
      const response = await HTTP.patch(`/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log("Профиль успешно обновлен:", response.data);
      
      // Обновляем пользователя в Redux store
      dispatch(update_user(response.data));
      
      // Увеличиваем версию фото для принудительного перерендера
      dispatch(increment_photo_version());
      
      // Дополнительно: если нужно обновить отдельно participant или mentor
      if (response.data.participant) {
        dispatch(update_user_participant(response.data.participant));
      }
      if (response.data.mentor) {
        dispatch(update_user_mentor(response.data.mentor));
      }
      
      // Закрываем форму редактирования
      setEditRegInfo(false);
      
      // Показываем уведомление об успехе
      toast.success("Профиль успешно обновлен!");
      
      return response.data;
    } catch (error) {
      console.error("Ошибка при сохранении профиля:", error);
      console.error("Детали ошибки:", error.response?.data);
      
      let errorMessage = "Ошибка при сохранении профиля";
      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map(err => 
            `${err.loc?.join('.') || ''}: ${err.msg}`
          ).join(', ');
        } else {
          errorMessage = error.response.data.detail;
        }
      } else if (error.response?.data) {
        // Если ошибка в другом формате
        errorMessage = JSON.stringify(error.response.data);
      }
      
      toast.error(errorMessage);
      throw error;
    }
  };

  const handlePhotoChange = (file) => {
    console.log("Фото изменено:", file);
  };

  const handlePdfChange = (file) => {
    console.log("PDF изменен:", file);
  };

  // Отладочный вывод для проверки структуры пользователя
  console.log("Redux user data:", user);
  console.log("User object:", user.user);

  const currentUser = user.user || user;

  return (
    <>
      <div className={styles.userHeader}>
        <LayoutProfileBg>
          <ProfileHeader 
            user={currentUser}
            setEditRegInfo={setEditRegInfo}
            isEditable={true}
          />
        </LayoutProfileBg>
      </div>
      <div className={styles.profileWrapper}>
        <Container fluid="xxl">
          <div className={styles.pt80}>
            <ProfileMenu
              user={currentUser}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onLogout={handleLogout}
            />
          </div>
          <div className={styles.contentBox}>
            {editRegInfo && (
              <ProfileForm 
                initialData={currentUser} 
                handlePhotoChange={handlePhotoChange}
                handlePdfChange={handlePdfChange}
                handleSaveProfile={handleSaveProfile}
              />
            )}
            {activeTab === "profile" && !editRegInfo && <PersonalInfo isViewied />}
            {activeTab === "users" && !editRegInfo && (
              <ProfileMembers
                user={currentUser}
                participants={participants}
                onRemoveParticipant={handleRemoveParticipant}
              />
            )}
            {activeTab === "teams" && currentUser?.isMentor && !editRegInfo && (
              <TeamsProfile user={currentUser} />
            )}
            {activeTab === "projects" && !editRegInfo && (
              <ProjectsProfile user={currentUser} />
            )}
          </div>
        </Container>
      </div>
    </>
  );
}