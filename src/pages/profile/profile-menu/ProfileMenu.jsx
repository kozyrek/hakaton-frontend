import React from "react";
import styles from "./profileMenu.module.css";
import Button from "../../../components/button/button"; 
import LogoutButton from "../../../components/logoutButton/logoutButton";

const ProfileMenu = ({ activeTab, onTabChange, onLogout }) => {
  const menuItems = [
    { key: "profile", label: "Мой профиль" },
    { key: "users", label: "Участники" },
    { key: "teams", label: "Команды" },
    { key: "projects", label: "Проекты" },
  ];

  return (
    <div className={styles.profileMenu}>
      {menuItems.map(({ key, label }) => (
        <Button
          key={key}
          menu
          text={label}
          isActive={activeTab === key}
          onClick={() => onTabChange(key)}
        />
      ))}
      <LogoutButton onClick={onLogout} text="Выйти из профиля" className={styles.logoutButton} />
     
    </div>
  );
};

export default ProfileMenu;
