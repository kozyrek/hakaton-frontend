import React, { useState, useEffect, useMemo } from "react";
import ModalWindow from "../../../../components/modalWindow/index";
import Button from "../../../../components/button/button";
import TextButton from "../../ui/textButton/textButton";
import styles from "./ModalsList.module.css";
import Inputs from "../../../../components/inputs/inputs";
import SearchInput from "../../ui/searchInput/searchInput";
import CustomCheckbox from "../../ui/сustomCheckbox/CustomCheckbox";

export const AddMemberInTeam = ({
  title,
  isOpen,
  onClose,
  list = [],
  onAddSelected,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSelectedIds([]);
    setSearchTerm("");
  }, [list]);

  const participants = useMemo(
    () =>
      list.map((item, idx) => ({
        id: item.id ?? idx,
        name: item.name ?? item.full_name,
        role: item.role,
      })),
    [list]
  );

  const filteredParticipants = useMemo(
    () =>
      participants.filter((item) => {
        const term = searchTerm.toLowerCase();
        return (
          item.name.toLowerCase().includes(term) ||
          (item.role && item.role.toLowerCase().includes(term))
        );
      }),
    [participants, searchTerm]
  );

  if (!isOpen) return null;

  const toggleSelection = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const handleAddBulk = () => {
    onAddSelected?.(selectedIds);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <ModalWindow
        title={title}
        setIsShow={onClose}
        addClass={styles.scaleModal}
      >
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск по имени или роли"
        />
        <div className={styles.scroll}>
          <ul className={styles.participantsListContainer}>
            {filteredParticipants.length > 0 ? (
              filteredParticipants.map((item) => (
                <li key={item.id} className={styles.participantItem}>
                  <div className={styles.leftParticipantItem}>
                    <CustomCheckbox
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelection(item.id)}
                      className={styles.checkbox}
                    />
                    <p className={styles.participantName}>{item.name}</p>
                    <span className={styles.participantRole}>{item.role}</span>
                  </div>
                  <TextButton
                    className={styles.textBtn}
                    onClick={() => onAddSelected?.([item.id])}
                  >
                    Добавить
                  </TextButton>
                </li>
              ))
            ) : (
              <div className={styles.emptyList}>Список пуст</div>
            )}
          </ul>
        </div>
        <div className={styles.addBtn}>
          <Button
            addClass={styles.addClass}
            text="Добавить выбранных"
            onClick={handleAddBulk}
            disabled={selectedIds.length === 0}
          />
        </div>
      </ModalWindow>
    </div>
  );
};

export const MessageModal = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <ModalWindow title={title} setIsShow={onClose} />
    </div>
  );
};

export const ProjectModal = ({
  isOpen,
  onClose,
  title,
  description,
  data = [],
  onSelect,
}) => {
  const projects = useMemo(() => {
    return data.map((item, idx) => {
      if (typeof item === "string") {
        return { id: idx + 1, name: item };
      }
      return {
        id: item.id ?? idx + 1,
        name: item.name ?? item.title ?? `Проект #${idx + 1}`,
      };
    });
  }, [data]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <ModalWindow
        title={title}
        description={description}
        setIsShow={onClose}
        addClass={styles.scaleModal}
      >
        <div className={styles.scroll}>
          <ul className={styles.participantsListContainer}>
            {projects.length > 0 ? (
              projects.map((project) => (
                <li key={project.id} className={styles.participantItem}>
                  <div className={styles.leftParticipantItem}>
                    <p className={styles.participantName}>{project.name}</p>
                  </div>
                  <TextButton
                    className={styles.textBtn}
                    onClick={() => onSelect(project)}
                  >
                    Добавить
                  </TextButton>
                </li>
              ))
            ) : (
              <div className={styles.emptyList}>Список проектов пуст</div>
            )}
          </ul>
        </div>
      </ModalWindow>
    </div>
  );
};

export const InputModal = ({
  isOpen,
  onClose,
  title,
  inputData,
  error,
  onChangeInputData,
  onConfirm,
  createText,
  cancelText,
  placeholder,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <ModalWindow title={title} setIsShow={onClose}>
        <Inputs
          name="inputData"
          type="text"
          placeholder={placeholder}
          formData={{ inputData: { value: inputData, type: "text" } }}
          formError={{ inputData: error }}
          onChange={(value) => onChangeInputData(value)}
        />
        <div className={styles.buttonContainerInput}>
          <Button
            addClass={styles.inputBtn}
            text={createText}
            large
            onClick={onConfirm}
          />
          <Button
            addClass={styles.inputBtn}
            text={cancelText}
            large
            onClick={onClose}
          />
        </div>
      </ModalWindow>
    </div>
  );
};

export const Modal7 = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <ModalWindow
        title="Модальное окно"
        description="Это модальное окно"
        setIsShow={onClose}
      >
        <div className={styles.btn}>
          <Button text="Закрыть" onClick={onClose} />
        </div>
      </ModalWindow>
    </div>
  );
};

export const ConfirmDeleteModal = ({
  isOpen,
  onCancel,
  onConfirm,
  title,
  description,
  confirmText = "Да",
  cancelText = "Нет",
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <ModalWindow title={title} description={description} setIsShow={onCancel}>
        <div className={styles.buttonContainer}>
          <Button text={confirmText} large onClick={onConfirm} />
          <Button text={cancelText} large onClick={onCancel} />
        </div>
      </ModalWindow>
    </div>
  );
};
