import React from "react";
import styles from "./profileMenu.module.css";
import logoutIcon from "../../../assests/images/icon/logout.svg";
import MenuButton from "../ui/menuBtn/menuButton"; // Импортируем новую кнопку



const ProfileMenu = ({ activeTab, onTabChange, onLogout }) => {
  return (
    <div className={styles.profileMenu}>
      <MenuButton isActive={activeTab === "profile"} onClick={() => onTabChange("profile")}>
        Мой профиль
      </MenuButton>
      <MenuButton isActive={activeTab === "users"} onClick={() => onTabChange("users")}>
        Участники
      </MenuButton>
      <MenuButton isActive={activeTab === "teams"} onClick={() => onTabChange("teams")}>
        Команды
      </MenuButton>
      <MenuButton isActive={activeTab === "projects"} onClick={() => onTabChange("projects")}>
        Проекты
      </MenuButton>
      <MenuButton variant="logout" onClick={onLogout} icon={logoutIcon}>
        Выйти из профиля
      </MenuButton>
    </div>
  );
};

export default ProfileMenu;
