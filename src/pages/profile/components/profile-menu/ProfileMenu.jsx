import React from 'react';
import PropTypes from 'prop-types';
import styles from './profileMenu.module.css';
import Button from '../../../../components/button/button';
import { Link } from 'react-router-dom';
import stylesLink from "../../../../components/button/button.module.css";
import LogoutButton from '../../../../components/logoutButton/logoutButton';

const MENU_ITEMS = {
  ADMIN: [
    { key: 'profile', label: 'Мой профиль' },
    { key: 'users', label: 'Участники' },
    { key: 'teams', label: 'Команды' },
    { key: 'projects', label: 'Проекты' }
  ],
  MENTOR: [
    { key: 'profile', label: 'Мой профиль' },
    { key: 'users', label: 'Участники' },
    { key: 'teams', label: 'Мои команды' },
    { key: 'projects', label: 'Мои проекты' }
  ],
  STUDENT: [
    { key: 'profile', label: 'Мой профиль' },
    { key: 'teams', label: 'Моя команда' },
    { key: 'projects', label: 'Мой проект' }
  ]
};

const ProfileMenu = ({ activeTab, onTabChange, onLogout, user }) => {
  const menuItems = React.useMemo(() => {
    if (!user) return [];

    if (user.isMentor) {
      return user.mentor?.isAdmin ? MENU_ITEMS.ADMIN : MENU_ITEMS.MENTOR;
    }

    return MENU_ITEMS.STUDENT;
  }, [user]);

  // Функция для определения типа элемента меню (кнопка или ссылка)
  const renderMenuItem = ({ key, label }) => {
    // Для менторов всегда показываем кнопки (переключение вкладок)
    if (user.isMentor) {
      return (
        <Button
          menu
          text={label}
          isActive={activeTab === key}
          onClick={() => onTabChange(key)}
        />
      );
    }

    // Для студентов:
    // "Мой профиль" всегда кнопка
    if (key === 'profile') {
      return (
        <Button
          menu
          text={label}
          isActive={activeTab === key}
          onClick={() => onTabChange(key)}
        />
      );
    }

    // Для "Моя команда" - проверяем наличие teamId
    if (key === 'teams') {
      // Если у студента есть команда - ссылка на страницу команды
      if (user.teamId) {
        return (
          <Link
            to={`/team/${user.teamId}`}
            className={`${stylesLink.menuButton} ${stylesLink.menuBtn}`}
          >
            {label}
          </Link>
        );
      } else {
        // Если команды нет - кнопка для перехода на вкладку команд
        return (
          <Button
            menu
            text={label}
            isActive={activeTab === key}
            onClick={() => onTabChange(key)}
          />
        );
      }
    }

    // Для "Мой проект" - проверяем наличие projectId
    if (key === 'projects') {
      // ИСПРАВЛЕНИЕ: Нужно получить projectId из команды пользователя
      // Временное решение: всегда показываем кнопку, так как projectId может быть в team
      return (
        <Button
          menu
          text={label}
          isActive={activeTab === key}
          onClick={() => onTabChange(key)}
        />
      );
    }

    // На всякий случай - кнопка по умолчанию
    return (
      <Button
        menu
        text={label}
        isActive={activeTab === key}
        onClick={() => onTabChange(key)}
      />
    );
  };

  if (!user) return null;

  return (
    <div className={styles.profileMenu}>
      <ul className={styles.profileTabs}>
        {menuItems.map((item) => (
          <li key={item.key}>
            {renderMenuItem(item)}
          </li>
        ))}
      </ul>
      <LogoutButton
        onClick={onLogout}
        text="Выйти из профиля"
        className={styles.logoutButton}
      />
    </div>
  );
};

ProfileMenu.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isMentor: PropTypes.bool,
    mentor: PropTypes.shape({
      isAdmin: PropTypes.bool
    }),
    teamId: PropTypes.number // Добавлено: ID команды студента
  }) 
};

export default ProfileMenu;