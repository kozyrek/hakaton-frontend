import React, { useEffect, useState } from "react";
import styles from "./profileMembers.module.css";
import SearchInput from "../../ui/searchInput/searchInput";
import Pagination from "../../ui/pagination/pagination";
import TextButton from "../../ui/textButton/textButton";
import getAllUser from "../../../../api/getAllUsers";
import { getRole } from "../head-profile/profileHeader";
import { ConfirmDeleteModal } from "../profileModals/ModalsList";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../utils/constants";

const ProfileMembers = ({ user, onRemoveParticipant }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [usersList, setUserList] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const participantsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const users = await getAllUser();
        setUserList(users);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Фильтрация по ФИО и роли
  const filteredUsers = (usersList.items || [])
    .filter((userItem) => {
      const query = searchQuery.toLowerCase();
      const fullName = `${userItem.lastName} ${userItem.firstName} ${userItem.patronymic}`.toLowerCase();
      const roleString = getRole(userItem).toLowerCase();
      return fullName.includes(query) || roleString.includes(query);
    })
    .filter((userItem) => {
      const isAdmin = user.mentor?.isAdmin ?? false;
      const isVerified = userItem.verified ?? false;
      return isAdmin || isVerified;
    });

  const totalPages = Math.ceil(filteredUsers.length / participantsPerPage);
  const startIndex = (currentPage - 1) * participantsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + participantsPerPage
  );

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

  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (participant, index) => {
    setSelectedParticipant({ participant, index });
    setShowModal(true);
  };

  const confirmRemoval = () => {
    if (selectedParticipant) {
      onRemoveParticipant(selectedParticipant.index);
      setShowModal(false);
      setSelectedParticipant(null);
    }
  };

  const cancelRemoval = () => {
    setShowModal(false);
    setSelectedParticipant(null);
  };

  if (loading) return <>Loading</>;

  return (
    <div className={styles.participantsList}>
      <h2 className={styles.profileTabTitle}>Участники</h2>
      <SearchInput
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
      />

      <ul className={styles.participantsListContainer}>
        {currentUsers.length > 0 ? (
          currentUsers.map((participant, index) => (
            <li
              key={participant.id}
              className={`${styles.participantItem} ${
                !participant.verified && styles.notVerified
              }`}
            >
              <div className={styles.participantInfo}>
                <Link
                  to={`${ROUTES.PROFILE}/${participant.id}`}
                  className={styles.link}
                >
                  {participant.lastName} {participant.firstName}{" "}
                  {participant.patronymic}
                </Link>
              </div>
              <div className={styles.rightZone}>{getRole(participant)}</div>
              <div>
                <TextButton
                  className={styles.removeButton}
                  onClick={() => openModal(participant, index)}
                >
                  Удалить
                </TextButton>
              </div>
            </li>
          ))
        ) : (
          <div className={styles.emptyList}>Список участников пуст</div>
        )}
      </ul>

      {totalPages > 1 && (
        <Pagination
          pageNumbers={pageNumbers}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      <ConfirmDeleteModal
        isOpen={showModal}
        onCancel={cancelRemoval}
        onConfirm={confirmRemoval}
        title="Действительно хотите удалить данного участника из команды?"
        description={
          selectedParticipant
            ? `${selectedParticipant.participant.lastName} ${selectedParticipant.participant.firstName} ${selectedParticipant.participant.patronymic}`
            : ""
        }
      />
    </div>
  );
};

export default ProfileMembers;
