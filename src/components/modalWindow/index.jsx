import React from "react";
import { Container } from "react-bootstrap";

import styles from "./index.module.css";
import CloseIcon from "./images/closeIcon";

export default function ModalWindow({
  title = "Добавь заголовок",
  description = "Добавь описание",
  setIsShow,
  children,
}) {
  return (
    <Container
      fluid
      className={styles.main}
    >
      <div className={styles.modal}>
        {setIsShow && (
          <div
            className={styles.closeIcon}
            onClick={setIsShow}
          >
            <CloseIcon />
          </div>
        )}
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <div style={{ position: "relative" }}>{children}</div>
      </div>
    </Container>
  );
}
