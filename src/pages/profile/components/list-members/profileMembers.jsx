import React, { useEffect, useState } from "react";
import styles from "./profileMembers.module.css";
import SearchInput from "../../ui/searchInput/searchInput";
import Pagination from "../../ui/pagination/pagination";
import DeleteButton from "../../ui/deleteBtn/deleteButton";
import ModalWindow from "../../../../components/modalWindow/index";
import Button from "../../../../components/button/button";
import getAllUser from "../../../../api/getAllUsers";
import { getRole } from "../head-profile/profileHeader";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../utils/constants";
import { useSelector } from "react-redux";
import deleteUser from "../../../../api/deleteUser";
import { useDebounce } from "../../../../hooks/useDebounce";

const ProfileMembers = ({
  user,
  participants,
  onRemoveParticipant,
}) => {
  // Состояния для поиска, пагинации и модального окна
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [usersList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  // Храним выбранного участника и его индекс (индекс в currentParticipants)
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const participantsPerPage = 10;

  // const token = useSelector((state) => state.user.token.accessToken);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const users = await getAllUser();
        console.log("users", users);
        setUserList(users);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const params = {
          search: debouncedSearchQuery || null,
        };

        const usersData = await getAllUser(params);
        setUserList(usersData || []);
      } catch (err) {
        console.error("Failed to fetch users:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearchQuery]);

  // Фильтрация участников по поисковому запросу
  // const filteredParticipants = participants.filter((p) => {
  //   const query = searchQuery.toLowerCase();
  //   return (
  //     p.full_name.toLowerCase().includes(query) ||
  //     (p.role && p.role.toLowerCase().includes(query))
  //   );
  // });

  // const totalPages = Math.ceil(
  //   filteredParticipants.length / participantsPerPage
  // );
  // const startIndex = (currentPage - 1) * participantsPerPage;
  // const currentParticipants = filteredParticipants.slice(
  //   startIndex,
  //   startIndex + participantsPerPage
  // );

  // Функция для генерации номеров страниц с эллипсисами
  const getPageNumbers = (current, total) => {
    const range = new Set();
    const rangeWithDots = [];
    let last;

    range.add(1);
    range.add(2);
    const middleStart = Math.max(4, Math.min(current - 1, total - 5));
    const middleEnd = Math.min(total - 3, middleStart + 2);

    for (let i = middleStart; i <= middleEnd; i++) {
      range.add(i);
    }

    range.add(total - 1);
    range.add(total);

    const sortedRange = [...range].sort((a, b) => a - b);
    for (let i of sortedRange) {
      if (last) {
        if (i - last === 2) {
          rangeWithDots.push(last + 1);
        } else if (i - last > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      last = i;
    }
    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers(currentPage, 1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Открытие модального окна с выбранным участником
  const openModal = (participant) => {
    setSelectedParticipant(participant.id);
    setShowModal(true);
  };

  const confirmRemoval = async () => {
    if (selectedParticipant) {
      try {
        await deleteUser(selectedParticipant);
        const params = { search: debouncedSearchQuery || null };
        const usersData = await getAllUser(params);
        setUserList(usersData.items || []);
      } catch (err) {
        console.error("Failed to delete user:", err.message);
      } finally {
        setShowModal(false);
        setSelectedParticipant(null);
      }
    }
  };

  // Отмена удаления
  const cancelRemoval = () => {
    setShowModal(false);
    setSelectedParticipant(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Нужно добавить прелоадер
  // if (loading) return <>Loading</>;

  return (
    <div className={styles.participantsList}>
      <h2 className={styles.profileTabTitle}>Участники</h2>
      <SearchInput
        value={searchQuery}
        onChange={(e) => handleSearchChange(e)}
      />

      <ul className={styles.participantsListContainer}>
        {loading && <div>Loading</div>}
        {(usersList.items || []).length > 0 ? (
          (usersList.items || [])
            .filter((participant) => {
              const isAdmin = user.mentor?.isAdmin ?? false;
              const isVerified = participant.verified ?? false;
              return isAdmin || isVerified;
            })
            .map((participant) => (
              <li
                key={participant.id}
                className={`${styles.participantItem} ${
                  !participant.verified && styles.notVerified
                }`}
              >
                <div className={`${styles.participantInfo}`}>
                  <Link
                    to={`${ROUTES.PROFILE}/${participant.id}`}
                    className={styles.link}
                  >
                    {participant.lastName} &nbsp;
                    {participant.firstName} &nbsp;
                    {participant.patronymic}
                  </Link>
                </div>
                <div className={styles.rightZone}>
                  <span className={styles.noUnderline}>
                    {getRole(participant)}
                  </span>
                </div>
                <div>
                  <DeleteButton
                    className={styles.removeButton}
                    onClick={() => openModal(participant)}
                  >
                    Удалить
                  </DeleteButton>
                </div>
              </li>
            ))
        ) : (
          <div className={styles.emptyList}>Список участников пуст</div>
        )}
      </ul>

      <Pagination
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {showModal && (
        <div className={styles.modalOverlay}>
          <ModalWindow
            title="Действительно хотите удалить данного участника?"
            // description={selectedParticipant?.participant.full_name}
            descriptionLg={false}
            setIsShow={cancelRemoval}
          >
            <div className={styles.buttonContainer}>
              <Button
                text="Да"
                large
                onClick={confirmRemoval}
                addClass={styles.confirmButton}
              />
              <Button
                text="Нет"
                large
                onClick={cancelRemoval}
                addClass={styles.cancelButton}
              />
            </div>
          </ModalWindow>
        </div>
      )}
    </div>
  );
};

export default ProfileMembers;
