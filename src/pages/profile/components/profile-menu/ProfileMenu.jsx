import React from 'react';
import PropTypes from 'prop-types';
import styles from './profileMenu.module.css';
import Button from '../../../../components/button/button';
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
    { key: 'teams', label: 'Команда' },
    { key: 'projects', label: 'Проект' }
  ]
};

const ProfileMenu = ({ activeTab, onTabChange, onLogout, user }) => {
  const menuItems = React.useMemo(() => {
    if (!user) return [];

    // Определяем, какие элементы меню отобразить
    if (user.isMentor) {
      return user.mentor?.isAdmin ? MENU_ITEMS.ADMIN : MENU_ITEMS.MENTOR;
    }

    return MENU_ITEMS.STUDENT;
  }, [user]);

  // Если пользователя нет, возвращаем null
  if (!user) return null;

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
    })
  }) 
};

export default ProfileMenu;