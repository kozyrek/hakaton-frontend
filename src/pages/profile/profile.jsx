import React, { useState } from "react";
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
import { logout, update_user, update_user_photo } from "../../store/user/userSlice"; // ИМПОРТИРУЕМ НОВЫЕ ACTIONS
import { useNavigate } from "react-router-dom";
import { HTTP } from "../../api/http";
import { toast } from "react-toastify";

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

  // ОБНОВЛЕНО: функция сохранения профиля
  const handleSaveProfile = async (formData) => {
    try {
      console.log("Отправка данных профиля:", formData);
      
      const response = await HTTP.patch(`/users/${user.user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log("Профиль успешно обновлен:", response.data);
      
      // ОБНОВЛЕНО: обновляем пользователя в Redux store
      dispatch(update_user(response.data));
      
      // Закрываем форму редактирования
      setEditRegInfo(false);
      
      // Показываем уведомление об успехе
      toast.success("Профиль успешно обновлен!");
      
      return response.data;
    } catch (error) {
      console.error("Ошибка при сохранении профиля:", error);
      
      let errorMessage = "Ошибка при сохранении профиля";
      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map(err => err.msg).join(', ');
        } else {
          errorMessage = error.response.data.detail;
        }
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

  return (
    <>
      <div className={styles.userHeader}>
        <LayoutProfileBg>
          <ProfileHeader 
            user={user.user} 
            setEditRegInfo={setEditRegInfo}
            isEditable={true}
          />
        </LayoutProfileBg>
      </div>
      <div className={styles.profileWrapper}>
        <Container fluid="xxl">
          <div className={styles.pt80}>
            <ProfileMenu
              user={user.user}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onLogout={handleLogout}
            />
          </div>
          <div className={styles.contentBox}>
            {editRegInfo && (
              <ProfileForm 
                initialData={user.user} 
                handlePhotoChange={handlePhotoChange}
                handlePdfChange={handlePdfChange}
                handleSaveProfile={handleSaveProfile}
              />
            )}
            {activeTab === "profile" && !editRegInfo && <PersonalInfo isViewied />}
            {activeTab === "users" && !editRegInfo && (
              <ProfileMembers
                user={user.user}
                participants={participants}
                onRemoveParticipant={handleRemoveParticipant}
              />
            )}
            {activeTab === "teams" && user.user.isMentor && !editRegInfo && (
              <TeamsProfile user={user.user} />
            )}
            {activeTab === "projects" && !editRegInfo && (
              <ProjectsProfile user={user.user} />
            )}
          </div>
        </Container>
      </div>
    </>
  );
}