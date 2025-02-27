import React from "react";
import { Container } from "react-bootstrap";
import styles from "./layoutProfileBg.module.css";
import ProfileBigLogo from "../../../assests/images/svg/profileBigLogo"; // Предполагается, что это React-компонент

export default function LayoutProfileBg({ children }) {
  return (
    <Container fluid className={styles.main}>
      <div className={styles.bigLogo}>
        <ProfileBigLogo />
      </div>
      <div className={styles.content}>
        <Container fluid="xl">{children}</Container>
      </div>
    </Container>
  );
}
