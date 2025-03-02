import React from "react";
import { Container } from "react-bootstrap";
import cn from "classnames";

import styles from "./index.module.css";

import CloseIcon from "./images/closeIcon";

/**
 * Компонент ModalWindow представляет собой модальное окно,
 * которое может отображать заголовок, описание и произвольные дочерние элементы.
 *
 * @param {string} [props.title="Добавь заголовок"] - Заголовок модального окна.
 * @param {string} [props.description] - Описание, отображаемое в модальном окне.
 * @param {Function} [props.setIsShow] - Функция для управления видимостью модального окна.
 * @param {boolean} [props.descriptionLg=false] - Флаг для изменения стиля описания на большой.
 * @param {React.ReactNode} [props.children] - Дочерние элементы, которые будут отображаться в модальном окне.
 *
 * @returns {JSX.Element} Возвращает элемент модального окна с заголовком, описанием и дочерними элементами.
 */

export default function ModalWindow({
  title = "Добавь заголовок",
  description,
  setIsShow,
  descriptionLg = false,
  children,
}) {
  return (
    <Container
      fluid
      className={styles.main}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className={styles.modal}>
        {setIsShow && (
          <div
            className={styles.closeIcon}
            onClick={setIsShow}
            aria-label="Закрыть окно"
          >
            <CloseIcon />
          </div>
        )}
        <div className={styles.title}>{title}</div>
        {description && (
          <p
            className={cn({
              [styles.description]: !descriptionLg,
              [styles.descriptionLg]: descriptionLg,
            })}
          >
            {description}
          </p>
        )}
        <div style={{ position: "relative" }}>{children}</div>
      </div>
    </Container>
  );
}
