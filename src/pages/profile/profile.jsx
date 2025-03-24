import React, { useState } from "react";
import data from "./data.json"; // Ваш JSON
import { Container } from "react-bootstrap";
import LayoutProfileBg from "./styles/layoutProfileBg";
import styles from "./styles/profile.module.css";
import searchIcon from "../../assests/images/svg/search.svg";
// import ProfileForm from "./profile-form/ProfileForm";
import ProfileHeader from "./components/head-profile/profileHeader";
import ProfileMenu from "./components/profile-menu/ProfileMenu";
import ProfileMembers from "./components/list-members/profileMembers";
import TeamsProfile from "./components/teams-profile/teamsProfile";
import ProjectsProfile from "./components/projects-profile/projectsProfile";
import PersonalInfo from "./components/personal-info";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  // Данные из JSON (без функционала редактирования)
  // const [user] = useState(data.user);
  const user = useSelector((state) => state.user);
  const [participants, setParticipants] = useState(data.participants);
  const [myTeams] = useState(data.my_teams);
  const [allTeams] = useState(data.all_teams);
  const [projects] = useState(data.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Управление вкладками
  const [activeTab, setActiveTab] = useState("profile");
  const handleTabChange = (tab) => setActiveTab(tab);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleRemoveParticipant = (index) => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className={styles.userHeader}>
        <LayoutProfileBg>
          <ProfileHeader user={user.user} />
        </LayoutProfileBg>
      </div>
      <div className={styles.profileWrapper}>
        <Container fluid="xxl">
          <div className={styles.mt80}>
            <ProfileMenu
              user={user.user}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onLogout={handleLogout}
            />
          </div>
          <div className={cn(styles.mt80, styles.mb160)}>
            {/* {activeTab === "profile" && <ProfileForm formData={user} />} */}
            {activeTab === "profile" && <PersonalInfo />}
            {activeTab === "users" && (
              <ProfileMembers
                user={user.user}
                participants={participants}
                searchIcon={searchIcon}
                onRemoveParticipant={handleRemoveParticipant}
              />
            )}
            {activeTab === "teams" && (
              <TeamsProfile
                myTeams={myTeams}
                allTeams={allTeams}
              />
            )}
            {activeTab === "projects" && (
              <ProjectsProfile projects={projects} />
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
