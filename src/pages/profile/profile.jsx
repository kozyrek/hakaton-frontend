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
// import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [participants, setParticipants] = useState();
  const [myTeams] = useState();
  const [allTeams] = useState();
  const [projects] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Управление вкладками
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

  return (
    <>
      <div className={styles.userHeader}>
        <LayoutProfileBg>
          <ProfileHeader user={user.user} setEditRegInfo={setEditRegInfo} />
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
            {/* {activeTab === "profile" && <ProfileForm formData={user} />} */}
            {editRegInfo && <ProfileForm formData={user.user} />}
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
