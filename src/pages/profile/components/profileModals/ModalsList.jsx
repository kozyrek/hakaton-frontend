import React from "react";
import ModalWindow from "../../../../components/modalWindow/index"
import Button from "../../../../components/button/button";
import styles from "./ModalsList.module.css"

export const Modal1 = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <ModalWindow
        title="Модальное окно 1"
        description="Это первое модальное окно"
        setIsShow={onClose}
      >
        <div className={styles.btn}>
          <Button text="Закрыть" onClick={onClose} />
        </div>
      </ModalWindow>
    </div>
  );
};

export const Modal2 = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <ModalWindow
        title="Модальное окно 2"
        description="Это второе модальное окно"
        setIsShow={onClose}
      >
        <div className={styles.btn}>
          <Button text="Закрыть" onClick={onClose} />
        </div>
      </ModalWindow>
    </div>
  );
};


export const Modal3 = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <ModalWindow
        title="Модальное окно 3"
        description="Это третье модальное окно"
        setIsShow={onClose}
      >
        <div className={styles.btn}>
          <Button text="Закрыть" onClick={onClose} />
        </div>
      </ModalWindow>
    </div>
  );
};

export const Modal4 = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <ModalWindow
        title="Модальное окно 4"
        description="Это четвертое модальное окно"
        setIsShow={onClose}
      >
        <div className={styles.btn}>
          <Button text="Закрыть" onClick={onClose} />
        </div>
      </ModalWindow>
    </div>
  );
};

export const Modal5 = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <ModalWindow
        title="Модальное окно 5"
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


export const Modal6 = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <ModalWindow
        title="Модальное окно 6"
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


export const Modal7 = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <ModalWindow
        title="Модальное окно 7"
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
      <ModalWindow
        title={title}
        description={description}
        setIsShow={onCancel}
      >
        <div className={styles.buttonContainer}>
          <Button
            text={confirmText}
            large
            onClick={onConfirm}
            addClass={styles.confirmButton}
          />
          <Button
            text={cancelText}
            large
            onClick={onCancel}
            addClass={styles.cancelButton}
          />
        </div>
      </ModalWindow>
    </div>
  );
};
