import React, { useState } from "react";
import styles from "./profileMembers.module.css";
import SearchInput from "../ui/searchInput/searchInput";
import Pagination from "../ui/pagination/pagination";
import DeleteButton from "../ui/deleteBtn/deleteButton";


const ProfileMembers = ({ participants, searchIcon, onRemoveParticipant }) => {
  // Локальное состояние для поиска и пагинации
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const participantsPerPage = 10;

  // Фильтрация участников по поисковому запросу
  const filteredParticipants = participants.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.full_name.toLowerCase().includes(query) ||
      (p.role && p.role.toLowerCase().includes(query))
    );
  });


  

  const totalPages = Math.ceil(filteredParticipants.length / participantsPerPage);
  const startIndex = (currentPage - 1) * participantsPerPage;
  const currentParticipants = filteredParticipants.slice(
    startIndex,
    startIndex + participantsPerPage
  );

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
  

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.participantsList}>
      <h3>Участники</h3>
      <SearchInput
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
        searchIcon={searchIcon}
      />

      <ul className={styles.participantsListContainer}>
        {currentParticipants.map((p, index) => (
          <li key={index} className={styles.participantItem}>
            <div className={styles.participantInfo}>
              <p className={styles.participantName}>{p.full_name}</p>
              <p className={styles.participantRole}>{p.role}</p>
            </div>
            <DeleteButton
              className={styles.removeButton}
              onClick={() => onRemoveParticipant(index)}
            >
              Удалить
            </DeleteButton>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <Pagination
          pageNumbers={pageNumbers}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProfileMembers;
