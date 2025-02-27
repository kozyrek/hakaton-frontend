import React, { useState } from "react";
import data from "./data.json"; // Ваш JSON
import { Container } from "react-bootstrap";
import LayoutProfileBg from "./styles/layoutProfileBg";
import styles from "./styles/profile.module.css";
import searchIcon from "../../assests/images/svg/search.svg";
import ProfileForm from "./profile-form/ProfileForm";
import ProfileHeader from "./head-profile/profileHeader";
import ProfileMenu from "./profile-menu/ProfileMenu";
import ProfileMembers from "./list-members/profileMembers";
import TeamsProfile from "./teams-profile/teamsProfile";
import ProjectsProfile from "./projects-profile/projectsProfile";

export default function Profile() {
  // Данные из JSON (без функционала редактирования)
  const [user] = useState(data.user);
  const [participants, setParticipants] = useState(data.participants);
  const [myTeams] = useState(data.my_teams);
  const [allTeams] = useState(data.all_teams);
  const [projects] = useState(data.projects);

  // Управление вкладками
  const [activeTab, setActiveTab] = useState("profile");
  const handleTabChange = (tab) => setActiveTab(tab);

  const handleLogout = () => alert("Вы вышли из профиля!");


  const handleRemoveParticipant = (index) => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <LayoutProfileBg>
        <ProfileHeader user={user} />
      </LayoutProfileBg>

      <div className={styles.profileWrapper}>
        <Container fluid="xl">
          <ProfileMenu
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onLogout={handleLogout}
          />

          {activeTab === "profile" && <ProfileForm formData={user} />}
          {activeTab === "users" && (

            <ProfileMembers
              participants={participants}
              searchIcon={searchIcon}
              onRemoveParticipant={handleRemoveParticipant}
            />
          )}
          {activeTab === "teams" && (
            <TeamsProfile myTeams={myTeams} allTeams={allTeams} />
          )}
          {activeTab === "projects" && <ProjectsProfile projects={projects} />}
        </Container>
      </div>
    </>
  );
}
