import { useEffect, useState } from "react";
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
import deleteUser from "../../../../api/deleteUser";
import { useDebounce } from "../../../../hooks/useDebounce";
import Loader from "../../../../components/loader/loader";

const ProfileMembers = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [usersData, setUsersData] = useState({
    items: [],
    totalPages: 1,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const participantsPerPage = 10;

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const params = {
          search: debouncedSearchQuery || null,
        };
        
        const response = await getAllUser(params, currentPage);
        setUsersData({
          items: response.items || [],
          totalPages: response.totalPages || 1,
          currentPage: response.currentPage || 1,
        });
        console.log(response.items)
      } catch (err) {
        console.error("Failed to fetch users:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearchQuery, currentPage]);

  const getPageNumbers = () => {
    const totalPages = usersData.totalPages;
    const currentPage = usersData.currentPage;
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== "..." && pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const openModal = (participant) => {
    setSelectedParticipant(participant.id);
    setShowModal(true);
  };

  const confirmRemoval = async () => {
    if (selectedParticipant) {
      try {
        await deleteUser(selectedParticipant);
        const params = { search: debouncedSearchQuery || null };
        const response = await getAllUser(params, currentPage, participantsPerPage);

        setUsersData({
          items: response.items || [],
          totalPages: response.totalPages || 1,
          currentPage: response.currentPage || 1,
        });
      } catch (err) {
        console.error("Failed to delete user:", err.message);
      } finally {
        setShowModal(false);
        setSelectedParticipant(null);
      }
    }
  };

  const cancelRemoval = () => {
    setShowModal(false);
    setSelectedParticipant(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <h2 className="titleH2">Участники</h2>
      <SearchInput
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Поиск участников"
      />

      <ul className={styles.participantsListContainer}>
        {loading && <Loader />}
        {!loading && usersData.items.length === 0 ? (
          <div className={styles.emptyList}>Список участников пуст</div>
        ) : (
          usersData.items
            .filter((participant) => {
              const isAdmin = user.mentor?.isAdmin ?? false;
            //   const isVerified = participant.verified ?? false;
            const isVerified = user.verified ?? false;
              return isAdmin || isVerified;
            })
            .map((participant) => (
              <li
                key={participant.id}
                className={`${styles.participantItem} ${
                  !participant.verified && styles.notVerified
                }`}
              >
                <Link
                  to={`${ROUTES.PROFILE}/${participant.id}`}
                  className={`text1 ${styles.participantInfo}`}
                >
                  {participant.lastName} {participant.firstName}{" "}
                  {participant.patronymic}
                </Link>
                <span className={`text1 ${styles.participantRole}`}>
                  {getRole(participant)}
                </span>
                <DeleteButton
                  className={`text2 ${styles.removeButton}`}
                  onClick={() => openModal(participant)}
                >
                  Удалить
                </DeleteButton>
              </li>
            ))
        )}
      </ul>

      {usersData.totalPages > 1 && (
        <Pagination
          pageNumbers={getPageNumbers()}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      {showModal && (
        <div className={styles.modalOverlay}>
          <ModalWindow
            title="Действительно хотите удалить данного участника?"
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
    </>
  );
};

export default ProfileMembers;